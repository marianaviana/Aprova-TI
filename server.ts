import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { EXAMS_INFO, SYLLABUS_DATA } from "./src/data/syllabusData.js";
import { CURATED_QUESTIONS } from "./src/data/curatedQuestions.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Resilient Gemini Invocation with Exponential Backoff and Model Fallback
interface GeminiCallOptions {
  model: string;
  fallbackModels?: string[];
  contents: any;
  config?: any;
}

async function callGeminiWithFallback(options: GeminiCallOptions): Promise<{ text: string; usedModel: string }> {
  const { model, fallbackModels = [], contents, config } = options;
  const candidateModels = [model, ...fallbackModels.filter((m) => m && m !== model)];

  let lastError: any = null;

  for (let i = 0; i < candidateModels.length; i++) {
    const currentModel = candidateModels[i];

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await getAiClient().models.generateContent({
          model: currentModel,
          contents,
          config,
        });
        const text = response.text || "";
        return { text, usedModel: currentModel };
      } catch (err: any) {
        lastError = err;
        const errMessage = String(err?.message || err || "");
        const isTransient =
          errMessage.includes("503") ||
          errMessage.includes("UNAVAILABLE") ||
          errMessage.includes("high demand") ||
          errMessage.includes("429") ||
          errMessage.includes("RESOURCE_EXHAUSTED");

        console.warn(
          `[Gemini Call] Model ${currentModel} (tentativa ${attempt + 1}) falhou: ${errMessage.slice(0, 160)}`
        );

        if (isTransient && attempt === 0) {
          await new Promise((resolve) => setTimeout(resolve, 800));
          continue;
        }
        break;
      }
    }
  }

  throw lastError;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    time: new Date().toISOString(),
  });
});

app.get("/api/syllabus", (req, res) => {
  res.json({
    exams: EXAMS_INFO,
    syllabus: SYLLABUS_DATA,
  });
});

app.get("/api/curated-questions", (req, res) => {
  const { examId, subjectId, format } = req.query;
  let questions = [...CURATED_QUESTIONS];

  if (examId) {
    questions = questions.filter((q) => q.examId === examId);
  }
  if (subjectId && subjectId !== "all") {
    questions = questions.filter((q) => q.subjectId === subjectId);
  }
  if (format) {
    questions = questions.filter((q) => q.format === format);
  }

  res.json({
    count: questions.length,
    questions,
  });
});

// AI Question Generator Endpoint
app.post("/api/generate-questions", async (req, res) => {
  const {
    examId = "seplag",
    profileId,
    subjectId,
    format = "multipla_escolha",
    count = 5,
    difficulty = "Difícil",
    focusDistractors = false,
  } = req.body;

  const targetExam = EXAMS_INFO[examId] || EXAMS_INFO.seplag;

  // Find relevant subjects & syllabus topics
  let relevantSubjects = SYLLABUS_DATA.filter((s) => s.examId === examId);
  if (profileId) {
    relevantSubjects = relevantSubjects.filter(
      (s) => !s.profileId || s.profileId === profileId
    );
  }
  if (subjectId && subjectId !== "all") {
    relevantSubjects = relevantSubjects.filter((s) => s.id === subjectId);
  }

  // If no subject found, use all
  if (relevantSubjects.length === 0) {
    relevantSubjects = SYLLABUS_DATA.filter((s) => s.examId === examId);
  }

  const subjectsSummary = relevantSubjects
    .map((s) => {
      const topicsList = s.topics
        .map((t) => `- ${t.name}: ${t.subtopics.slice(0, 4).join("; ")}`)
        .join("\n");
      return `Disciplina: ${s.name}\n${topicsList}`;
    })
    .join("\n\n");

  const isTrueFalse = format === "certo_errado";
  const numQuestions = Math.min(Math.max(Number(count) || 5, 1), 10);

  // If no API key is set, fallback to curated questions
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY not found. Returning curated questions.");
    let filtered = CURATED_QUESTIONS.filter((q) => q.examId === examId);
    if (format) filtered = filtered.filter((q) => q.format === format);
    if (subjectId && subjectId !== "all") {
      filtered = filtered.filter((q) => q.subjectId === subjectId);
    }
    if (filtered.length === 0) {
      filtered = CURATED_QUESTIONS.filter((q) => q.examId === examId);
    }
    return res.json({
      success: true,
      fromCurated: true,
      questions: filtered.slice(0, numQuestions),
    });
  }

  try {
    const distractorsDirective = focusDistractors
      ? `\n\n🎯 MODO FOCO EM DISTRATORES E PEGADINHAS FGV ATIVADO:
- Elabore enunciados densos e alternativas extensas com as armadilhas conceituais clássicas da banca FGV.
- Realize trocas finas e verossímeis de conceitos em normas e frameworks (ex.: inverter papéis de Governança vs Gestão no COBIT 2019; confundir Práticas e Processos ou Princípios Orientadores no ITIL 4; trocar dimensões ou fases de maturidade no DMBOK; trocar competências de Controlador, Operador e Encarregado/DPO na LGPD; inverter camadas de segurança ISO/IEC 27001/27002; trocar métricas de engenharia de software e padrões de microsserviços/nuvem).
- Empregue termos "quase certos" (afirmativas 90-95% corretas na leitura rápida, porém com uma única palavra ou premissa sutilmente falseada).
- No campo "justification", desmonte explicitamente a armadilha do examinador FGV e explique detalhadamente por que cada distrator parece atrativo mas está incorreto.`
      : '';

    const prompt = `Você é o examinador sênior da banca Fundação Getulio Vargas (FGV Conhecimento) para concursos de alto nível na área de Tecnologia da Informação (${targetExam.name} - ${targetExam.role}).
Gere exatamente ${numQuestions} questões INÉDITAS e de alta complexidade técnica sobre o conteúdo programático oficial dos editais anexados.

FORMATO REQUISITADO: ${isTrueFalse ? "CERTO ou ERRADO (estilo julgamento de assertiva técnica com fundamentação)" : "MÚLTIPLA ESCOLHA com exatamente 5 alternativas (A, B, C, D, E)"}.
NÍVEL DE DIFICULDADE: ${difficulty} (Padrão FGV de prova de elite: cenários de casos práticos, tomada de decisão em governança/arquitetura/engenharia de dados, distratores sutis e inteligentes).
${distractorsDirective}

CONTEÚDO PROGRAMÁTICO DE REFERÊNCIA:
${subjectsSummary}

REQUISITOS OBRIGATÓRIOS PARA CADA QUESTÃO:
1. "statement": Enunciado contextualizado, rico, com caso hipotético realista de órgão público ou empresa estatal.
2. "options": ${isTrueFalse ? 'Exatamente 2 opções: {"id": "C", "text": "Certo"} e {"id": "E", "text": "Errado"}' : 'Exatamente 5 opções: {"id": "A"}, {"id": "B"}, {"id": "C"}, {"id": "D"}, {"id": "E"}'}.
3. "correctOptionId": O identificador da opção correta (${isTrueFalse ? '"C" ou "E"' : '"A", "B", "C", "D" ou "E"'}).
4. "justification": Justificativa aprofundada demonstrando o porquê técnico da resposta correta e analisando por que os distratores induzem o candidato ao erro (estilo FGV).
5. "syllabusCitation": Citação formal exata do tópico do Edital correspondente (ex: "${targetExam.shortName} Anexo I - Governança e Gestão de TIC: COBIT 2019").
6. "subjectName": Nome da disciplina.
7. "topicName": Nome do tópico programático.`;

    const { text, usedModel } = await callGeminiWithFallback({
      model: "gemini-3.8-flash",
      fallbackModels: ["gemini-3.1-flash-lite", "gemini-flash-latest"],
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              statement: {
                type: Type.STRING,
                description: "Enunciado contextualizado da questão.",
              },
              options: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING, description: "Identificador (A, B, C, D, E ou C, E)" },
                    text: { type: Type.STRING, description: "Texto da alternativa" },
                  },
                  required: ["id", "text"],
                },
              },
              correctOptionId: {
                type: Type.STRING,
                description: "Alternativa correta",
              },
              justification: {
                type: Type.STRING,
                description: "Fundamentação teórica do gabarito e análise dos distratores.",
              },
              syllabusCitation: {
                type: Type.STRING,
                description: "Citação do tópico do edital.",
              },
              subjectName: {
                type: Type.STRING,
                description: "Disciplina da questão.",
              },
              topicName: {
                type: Type.STRING,
                description: "Tópico da disciplina.",
              },
            },
            required: [
              "statement",
              "options",
              "correctOptionId",
              "justification",
              "syllabusCitation",
              "subjectName",
              "topicName",
            ],
          },
        },
      },
    });

    const parsed = JSON.parse(text || "[]");

    const formattedQuestions = parsed.map((item: any, index: number) => ({
      id: `ai-gen-${Date.now()}-${index}`,
      examId,
      profileId: profileId || undefined,
      subjectId: subjectId || relevantSubjects[0]?.id || "geral",
      subjectName: item.subjectName || relevantSubjects[0]?.name || "Tecnologia da Informação",
      topicName: item.topicName || "Conhecimentos Específicos",
      format,
      difficulty,
      statement: item.statement,
      options: item.options,
      correctOptionId: item.correctOptionId,
      justification: item.justification,
      syllabusCitation: item.syllabusCitation,
      isAiGenerated: true,
      focusDistractors: !!focusDistractors,
    }));

    res.json({
      success: true,
      fromCurated: false,
      modelUsed: usedModel,
      questions: formattedQuestions,
    });
  } catch (error: any) {
    console.error("Error generating questions with Gemini:", error);
    // Graceful fallback to curated questions
    let filtered = CURATED_QUESTIONS.filter((q) => q.examId === examId);
    if (format) filtered = filtered.filter((q) => q.format === format);
    if (filtered.length === 0) filtered = CURATED_QUESTIONS;

    res.json({
      success: true,
      fromCurated: true,
      fallbackReason: error?.message || "Fallback acionado",
      questions: filtered.slice(0, numQuestions),
    });
  }
});

// Interactive AI Tutor Endpoint
app.post("/api/explain-question", async (req, res) => {
  const { question, userAnswer, userQuery } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.json({
      explanation: `Dica de Estudo: A resposta correta para esta questão é "${question.correctOptionId}".\n\nFundamentação: ${question.justification}\n\nTópico do Edital: ${question.syllabusCitation}`,
    });
  }

  try {
    const prompt = `Você é um professor mentor especialista em concursos públicos da área de Tecnologia da Informação (FGV, Cesgranrio, FCC).
O aluno está respondendo à seguinte questão:

ENUNCIADO:
${question.statement}

ALTERNATIVAS:
${question.options.map((o: any) => `${o.id}) ${o.text}`).join("\n")}

GABARITO OFICIAL: Alternativa ${question.correctOptionId}
JUSTIFICATIVA: ${question.justification}
TÓPICO DO EDITAL: ${question.syllabusCitation}

RESPOSTA DO ALUNO: ${userAnswer ? `Alternativa ${userAnswer}` : "Ainda não respondeu"}
DÚVIDA ESPECÍFICA DO ALUNO: ${userQuery || "Explique em detalhes o conceito, as pegadinhas e como não errar questões desse tipo."}

Responda de forma didática, clara, estruturada e motivadora, apontando exatamente o conceito-chave e o padrão de cobrança da banca.`;

    const { text } = await callGeminiWithFallback({
      model: "gemini-3.8-flash",
      fallbackModels: ["gemini-3.1-flash-lite", "gemini-flash-latest"],
      contents: prompt,
    });

    res.json({
      explanation: text,
    });
  } catch (error: any) {
    console.error("Error explaining question:", error);
    res.json({
      explanation: `Explicação detalhada:\n\n${question.justification}\n\nConexão com o edital: ${question.syllabusCitation}`,
    });
  }
});

// Multi-turn Gemini Chatbot Endpoint
app.post("/api/chat", async (req, res) => {
  const {
    messages = [],
    roleId = "professor",
    model = "gemini-3.8-flash",
  } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Mensagens não informadas." });
  }

  // System Instructions per Persona
  const systemInstructions: Record<string, string> = {
    professor: `Você é o "Mentor Sênior Aprova-TI", um renomado professor especialista em Concursos Públicos de Tecnologia da Informação com foco nos editais SEPLAG-RJ (FGV), DATAPREV (FGV), TRANSPETRO (Cesgranrio) e ABGF (FCC).
Seu papel:
- Explicar com rigor técnico e didática impecável temas como Governança (COBIT 2019, ITIL 4, ISO 38500), Dados e Engenharia Analítica (DAMA-DMBOK v2, Data Lakehouse, SQL/NoSQL, Parquet, Spark), Cibersegurança e Redes (ISO 27001/27002, MITRE ATT&CK, NIST CSF 2.0, CIS Controls, BGP, OSPF, Criptografia), Cloud, DevOps e Microsserviços (Kubernetes, Docker, CI/CD, Ansible, Terraform) e Legislação de TIC (LGPD, Lei 14.133/2021, IN SGD/ME 94/2022).
- Desmascarar as pegadinhas das bancas (FGV, Cesgranrio e FCC): trocas conceituais sutis, generalizações enganosas e termos quase certos.
- Use formatação Markdown elegante (negrito, listas ordenadas, tabelas e trechos de código quando relevante).
- Responda sempre em Português do Brasil com tom encorajador, estratégico e de altíssimo nível técnico.`,

    recursos: `Você é o "Especialista em Recursos e Gabaritos de TI (FGV, Cesgranrio, FCC)".
Seu papel:
- Analisar minuciosamente questões de concursos de TI com foco na redação de recursos administrativos sólidos, identificação de duplicidade de gabarito, contradições com normas oficiais (ex.: COBIT 2019, ITIL 4, DMBOK, ISO/IEC, NIST CSF, Lei 14.133/2021, LGPD) ou extrapolação do edital.
- Apresentar a fundamentação com citações literais das normas, autores consagrados (Pressman, Tanenbaum, Date, Kimball, Silberschatz) e jurisprudência do TCU.
- Estruturar respostas no modelo clássico de recurso: 1. Síntese do Enunciado e Gabarito Preliminar; 2. Fatos e Fundamentação Técnica; 3. Pedido Conclusivo (Anulação ou Mudança de Gabarito).`,

    flash_lite: `Você é o "Treinador Flash Aprova-TI" (Modo Rápido & Objetivo).
Seu papel:
- Fornecer respostas diretas, ultra concisas e no formato de cartões de memorização (flashcards), resumos mnemônicos e mapas mentais rápidos.
- Sem rodeios nem introduções prolixas: vá direto ao ponto técnico que cai nas provas da FGV, Cesgranrio e FCC.
- Ideal para revisões de última hora e fixação rápida de conceitos técnicos.`,

    examinador_pro: `Você é a "Banca Examinadora de TI (Modo Desafio de Elite)".
Seu papel:
- Agir como o examinador da banca: questionar o candidato com casos práticos complexos de órgãos da Administração Pública e estatais, propor cenários de tomada de decisão e testar se o aluno realmente domina a aplicação prática ou se apenas memorizou conceitos.
- Desafie o candidato, aponte imediatamente onde o raciocínio dele é fraco e simule a pressão intelectual de uma prova de alto nível técnico.`,
  };

  const selectedInstruction =
    systemInstructions[roleId] || systemInstructions.professor;

  // Selected target model
  let targetModel = model || "gemini-3.8-flash";
  if (roleId === "flash_lite" && (!req.body.model || req.body.model === "gemini-3.8-flash")) {
    targetModel = "gemini-3.1-flash-lite";
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.json({
      reply: `**[Modo Demonstração Offline]**\n\nPara interações em tempo real com o motor Gemini (${targetModel}), configure a variável de ambiente \`GEMINI_API_KEY\` no painel de Secrets.\n\nEnquanto isso, você pode explorar todas as centenas de questões e explicações comentadas já catalogadas no banco oficial!`,
      model: targetModel,
      roleId,
    });
  }

  try {
    const contents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: String(m.content || "") }],
    }));

    // Fallback models priority queue
    const fallbackList = [
      "gemini-3.1-flash-lite",
      "gemini-3.8-flash",
      "gemini-flash-latest",
    ].filter((m) => m !== targetModel);

    const { text, usedModel } = await callGeminiWithFallback({
      model: targetModel,
      fallbackModels: fallbackList,
      contents,
      config: {
        systemInstruction: selectedInstruction,
      },
    });

    const replyText = text || "Sem resposta gerada pelo modelo.";

    res.json({
      reply: replyText,
      model: usedModel,
      roleId,
    });
  } catch (error: any) {
    console.error("Error in Gemini Chatbot:", error);
    const errStr = String(error?.message || error || "");
    const isHighDemand =
      errStr.includes("503") ||
      errStr.includes("UNAVAILABLE") ||
      errStr.includes("high demand") ||
      errStr.includes("429") ||
      errStr.includes("RESOURCE_EXHAUSTED");

    if (isHighDemand) {
      // Graceful high-demand fallback response so user is never blocked
      return res.json({
        reply: `⚠️ **Aviso de Alta Demanda Temporária nos Servidores Gemini (Status 503)**\n\nO serviço de inteligência artificial está enfrentando um pico de acessos globais neste instante.\n\nTentamos a recuperação automática alternando entre os modelos disponíveis (\`gemini-3.8-flash\`, \`gemini-3.1-flash-lite\`), mas a fila de processamento permanece momentaneamente sobrecarregada.\n\n💡 **Dicas para continuar:**\n1. Aguarde alguns segundos e envie sua mensagem novamente.\n2. Alterne para o modelo **\`gemini-3.1-flash-lite\`** no menu superior (geralmente tem tempo de resposta mais rápido e menor fila).\n3. Você também pode continuar praticando pelo **Simulado**, que conta com centenas de questões catalogadas com gabaritos fundamentados!`,
        model: "contingencia-offline",
        roleId,
        isHighDemand: true,
      });
    }

    res.status(500).json({
      error: "Falha ao processar mensagem com Gemini IA.",
      details: error?.message || String(error),
    });
  }
});

// Vite Middleware Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
