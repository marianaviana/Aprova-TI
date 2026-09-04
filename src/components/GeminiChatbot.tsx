import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import {
  Bot,
  Send,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  BookOpen,
  Scale,
  Zap,
  ShieldAlert,
  Cpu,
  HelpCircle,
  X,
  ExternalLink,
  Layers,
  AlertTriangle,
} from 'lucide-react';
import { ChatMessage, ChatbotPersona, Question } from '../types';

interface GeminiChatbotProps {
  contextQuestion?: Question | null;
  onClearContextQuestion?: () => void;
  isFloatingModal?: boolean;
  onCloseModal?: () => void;
  onCreateFlashcard?: (data: {
    front: string;
    back: string;
    tags: string[];
    source: 'mentor';
    subjectName?: string;
  }) => void;
}

const STORAGE_KEY = 'aprova_ti_gemini_chat_history_v2';
const PERSONA_STORAGE_KEY = 'aprova_ti_gemini_persona_v2';
const MODEL_STORAGE_KEY = 'aprova_ti_gemini_model_v2';

const PERSONAS: Array<{
  id: ChatbotPersona;
  name: string;
  badge: string;
  tagline: string;
  recommendedModel: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}> = [
  {
    id: 'professor',
    name: 'Professor Sênior FGV',
    badge: 'Didático & Aprofundado',
    tagline: 'Explica conceitos de TI dos editais SEPLAG e DATAPREV e desmascara pegadinhas clássicas da banca.',
    recommendedModel: 'gemini-3.8-flash',
    icon: BookOpen,
    accentColor: 'from-sky-600 to-indigo-600 text-sky-600 border-sky-200 bg-sky-50',
  },
  {
    id: 'recursos',
    name: 'Especialista em Recursos',
    badge: 'Anulação & Fundamentação',
    tagline: 'Identifica dubiedades em enunciados da FGV e redige recursos técnicos baseados em normas e doutrina.',
    recommendedModel: 'gemini-3.8-flash',
    icon: Scale,
    accentColor: 'from-amber-600 to-orange-600 text-amber-600 border-amber-200 bg-amber-50',
  },
  {
    id: 'flash_lite',
    name: 'Treinador Flash (Rápido)',
    badge: 'Ultra Rápido & Objetivo',
    tagline: 'Respostas em tópicos diretos, mapas mentais e flashcards instantâneos com latência mínima.',
    recommendedModel: 'gemini-3.1-flash-lite',
    icon: Zap,
    accentColor: 'from-emerald-600 to-teal-600 text-emerald-600 border-emerald-200 bg-emerald-50',
  },
  {
    id: 'examinador_pro',
    name: 'Banca Examinadora FGV',
    badge: 'Desafio de Elite',
    tagline: 'Simula a arguição do examinador da FGV com casos práticos e desafios complexos de TI pública.',
    recommendedModel: 'gemini-3.8-flash',
    icon: ShieldAlert,
    accentColor: 'from-purple-600 to-indigo-700 text-purple-600 border-purple-200 bg-purple-50',
  },
];

const SUGGESTED_PROMPTS: Array<{ title: string; prompt: string; persona: ChatbotPersona }> = [
  {
    title: 'Pegadinhas de COBIT 2019',
    prompt: 'Quais são as pegadinhas e distratores conceituais mais frequentes da FGV sobre COBIT 2019 (ex: Governança vs Gestão e os 40 Objetivos)?',
    persona: 'professor',
  },
  {
    title: 'Kimball vs Inmon no DMBOK',
    prompt: 'Explique a diferença essencial entre a abordagem bottom-up de Ralph Kimball e a top-down de Bill Inmon na modelagem de Data Warehouse, focando em como a FGV cobra isso.',
    persona: 'professor',
  },
  {
    title: 'ISO 27002:2022 em 4 Temas',
    prompt: 'Gere um resumo mnemônico dos 4 temas de controles da ISO/IEC 27002:2022 (Organizacional, Pessoas, Físico e Tecnológico).',
    persona: 'flash_lite',
  },
  {
    title: 'Recurso de Questão FGV',
    prompt: 'Como estruturar um recurso formal contra uma questão de concurso de TI da FGV que apresentou duplicidade de resposta ou erro doutrinário?',
    persona: 'recursos',
  },
  {
    title: 'Desafio Prático de K8s & Cloud',
    prompt: 'Simule um desafio técnico da banca FGV para a DATAPREV: um cenário de falha de Pods em Kubernetes e como projetar a resiliência com Ingress e Services.',
    persona: 'examinador_pro',
  },
  {
    title: 'Estratégia de Tempo em 100Q',
    prompt: 'Qual a melhor estratégia de gestão de tempo para responder a prova de 100 questões da SEPLAG-RJ em 4h30 sem cair nos gargalos das questões longas da FGV?',
    persona: 'professor',
  },
];

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  contextQuestion,
  onClearContextQuestion,
  isFloatingModal = false,
  onCloseModal,
  onCreateFlashcard,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return [
      {
        id: 'welcome-msg',
        role: 'model',
        content: `👋 **Olá, futuro aprovado em TI!** Sou o seu **Mentor IA Especialista em Concursos de TI**.\n\nFocado 100% nos editais e bancas de Tecnologia da Informação:\n- **SEPLAG-RJ** (FGV • Analista de Planejamento e Orçamento - TI)\n- **DATAPREV** (FGV • Analista de TI em todos os perfis)\n- **TRANSPETRO** (Cesgranrio • Profissional Transpetro TI)\n- **ABGF** (FCC • Analista de TI)\n\n💡 Você pode tirar dúvidas conceituais (COBIT, ITIL, DMBOK, ISO, Nuvem, Kubernetes, LGPD), desarmar pegadinhas ou transformar qualquer explicação minha em **Flashcard de revisão**. Como posso te apoiar agora?`,
        timestamp: new Date().toISOString(),
      },
    ];
  });

  const [selectedPersona, setSelectedPersona] = useState<ChatbotPersona>(() => {
    return (localStorage.getItem(PERSONA_STORAGE_KEY) as ChatbotPersona) || 'professor';
  });

  const [selectedModel, setSelectedModel] = useState<string>(() => {
    return localStorage.getItem(MODEL_STORAGE_KEY) || 'gemini-3.8-flash';
  });

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedCardId, setSavedCardId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(PERSONA_STORAGE_KEY, selectedPersona);
  }, [selectedPersona]);

  useEffect(() => {
    localStorage.setItem(MODEL_STORAGE_KEY, selectedModel);
  }, [selectedModel]);

  // If a context question is provided, prepopulate or inform
  useEffect(() => {
    if (contextQuestion) {
      setInputText(
        `Gostaria de uma explicação profunda sobre esta questão da banca FGV:\n\n` +
        `**Enunciado:** "${contextQuestion.statement.slice(0, 280)}..."\n` +
        `**Gabarito Correto:** Alternativa ${contextQuestion.correctOptionId}\n\n` +
        `Poderia explicar por que o gabarito é este e como identificar as pegadinhas dos distratores?`
      );
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [contextQuestion]);

  // Scroll to bottom on messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (
    textToSend?: string,
    retryFailedMessageId?: string,
    overrideModel?: string
  ) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const activeModelToUse = overrideModel || selectedModel;

    // If retrying, filter out the failed error message
    let baseMessages = messages;
    if (retryFailedMessageId) {
      baseMessages = messages.filter((m) => m.id !== retryFailedMessageId);
    }

    // Check if the user message is already the last message
    const lastMsg = baseMessages[baseMessages.length - 1];
    let newMessages = baseMessages;
    if (!lastMsg || lastMsg.role !== 'user' || lastMsg.content !== text) {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text,
        timestamp: new Date().toISOString(),
        contextQuestion: contextQuestion
          ? {
              id: contextQuestion.id,
              statement: contextQuestion.statement,
              correctOptionId: contextQuestion.correctOptionId,
            }
          : undefined,
      };
      newMessages = [...baseMessages, userMessage];
    }

    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    // Format messages for backend API
    const apiMessages = newMessages
      .filter((m) => m.id !== 'welcome-msg' && !m.isError)
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages.length > 0 ? apiMessages : [{ role: 'user', content: text }],
          roleId: selectedPersona,
          model: activeModelToUse,
        }),
      });

      if (!response.ok) {
        let serverError = '';
        try {
          const errData = await response.json();
          serverError = errData.details || errData.error || errData.message || '';
        } catch {
          serverError = response.statusText;
        }
        const finalErrorMsg =
          serverError && serverError.trim().length > 0
            ? serverError
            : `Erro no servidor de IA (Status HTTP ${response.status})`;
        throw new Error(finalErrorMsg);
      }

      const data = await response.json();

      const modelReply: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.reply || 'Sem resposta gerada pelo modelo.',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, modelReply]);
    } catch (error: any) {
      console.error('Chat error:', error);
      const rawError = String(error?.message || '').trim();
      const isDemand =
        rawError.includes('503') ||
        rawError.toLowerCase().includes('demand') ||
        rawError.toLowerCase().includes('unavailable');
      const safeErrorDetails =
        rawError && rawError.length > 0
          ? rawError
          : 'O servidor de inteligência artificial não respondeu a tempo.';

      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'model',
        isError: true,
        canRetry: true,
        failedUserMessage: text,
        content: isDemand
          ? `⚠️ **Alta demanda momentânea no modelo de IA (503)**\n\nOs servidores da Gemini estão passando por um pico temporário de requisições globais.\n\n💡 Você pode clicar no botão **"Reenviar mensagem"** para retentar agora, ou alternar para o modelo **\`gemini-3.1-flash-lite\`** que possui resposta imediata.`
          : `⚠️ **Não foi possível obter resposta no momento**\n\n*Detalhes:* ${safeErrorDetails}.\n\nClique em **"Reenviar mensagem"** abaixo para uma nova tentativa imediata.`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      if (contextQuestion && onClearContextQuestion) {
        onClearContextQuestion();
      }
    }
  };

  const handleRetry = (failedMessageId: string, userPrompt?: string, modelOverride?: string) => {
    let promptToUse = userPrompt;
    if (!promptToUse) {
      const lastUser = [...messages].reverse().find((m) => m.role === 'user');
      promptToUse = lastUser ? lastUser.content : '';
    }
    if (promptToUse) {
      handleSendMessage(promptToUse, failedMessageId, modelOverride);
    }
  };

  const handleCreateFlashcardFromMessage = (message: ChatMessage, idx: number) => {
    if (!onCreateFlashcard) return;

    let frontQuestion = 'Conceito Explicado pelo Mentor IA';
    for (let i = idx - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        frontQuestion = messages[i].content;
        break;
      }
    }

    onCreateFlashcard({
      front: frontQuestion,
      back: message.content,
      tags: ['Mentor IA', 'Revisão Rápida', 'Concurso TI'],
      source: 'mentor',
      subjectName: contextQuestion?.subjectName || 'Tecnologia da Informação',
    });

    setSavedCardId(message.id);
    setTimeout(() => {
      setSavedCardId(null);
    }, 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Deseja limpar todo o histórico de mensagens deste chat?')) {
      const resetMsg: ChatMessage = {
        id: `welcome-${Date.now()}`,
        role: 'model',
        content: `Histórico reiniciado. Como posso te auxiliar na sua preparação hoje?`,
        timestamp: new Date().toISOString(),
      };
      setMessages([resetMsg]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activePersona = PERSONAS.find((p) => p.id === selectedPersona) || PERSONAS[0];
  const PersonaIcon = activePersona.icon;

  return (
    <div
      id="gemini-chatbot-container"
      className={`flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden ${
        isFloatingModal
          ? 'h-[85vh] max-h-[720px] w-full max-w-2xl'
          : 'h-[calc(100vh-140px)] min-h-[600px] w-full'
      }`}
    >
      {/* Header */}
      <div className="bg-slate-900 text-white px-4 py-3 sm:px-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold tracking-tight text-white">Mentor IA FGV</h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                <Sparkles className="w-3 h-3" />
                Gemini Multi-Turn
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {activePersona.name} • {activePersona.badge}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearHistory}
            title="Limpar histórico"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Limpar</span>
          </button>

          {isFloatingModal && onCloseModal && (
            <button
              onClick={onCloseModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Control Bar: Persona and Model Switchers */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 sm:px-6 flex flex-wrap items-center justify-between gap-2.5">
        {/* Personas selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
            Papel:
          </span>
          {PERSONAS.map((p) => {
            const Icon = p.icon;
            const isSelected = p.id === selectedPersona;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPersona(p.id);
                  if (p.id === 'flash_lite') {
                    setSelectedModel('gemini-3.1-flash-lite');
                  }
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-300 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-sky-600" />
                <span>{p.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Model selector */}
        <div className="flex items-center gap-1.5 ml-auto text-xs text-slate-600">
          <Cpu className="w-3.5 h-3.5 text-indigo-600" />
          <span className="hidden sm:inline font-medium text-[11px] text-slate-500">Modelo:</span>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="gemini-3.8-flash">gemini-3.8-flash (Padrão)</option>
            <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Rápido / Menor Fila)</option>
            <option value="gemini-flash-latest">gemini-flash-latest (Estável)</option>
            <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Raciocínio Profundo)</option>
          </select>
        </div>
      </div>

      {/* Context question notification banner if passed */}
      {contextQuestion && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2 truncate">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="font-semibold shrink-0">Questão em análise:</span>
            <span className="truncate text-amber-800">
              [{contextQuestion.subjectName}] {contextQuestion.statement.slice(0, 100)}...
            </span>
          </div>
          {onClearContextQuestion && (
            <button
              onClick={onClearContextQuestion}
              className="text-amber-700 hover:text-amber-900 font-bold ml-2 shrink-0"
              title="Remover contexto"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Scrollable Message Thread */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
        {messages.map((message) => {
          const isUser = message.role === 'user';
          return (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white text-xs font-bold shadow-xs ${
                  isUser
                    ? 'bg-slate-800'
                    : 'bg-gradient-to-tr from-sky-600 to-indigo-600'
                }`}
              >
                {isUser ? 'VC' : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Box */}
              <div
                className={`group relative max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-xs text-sm ${
                  isUser
                    ? 'bg-sky-600 text-white rounded-tr-xs'
                    : message.isError
                    ? 'bg-rose-50/80 text-slate-900 border-2 border-rose-300 rounded-tl-xs'
                    : 'bg-white text-slate-900 border border-slate-200 rounded-tl-xs'
                }`}
              >
                {/* Header inside bubble */}
                <div
                  className={`flex items-center justify-between gap-2 mb-1.5 text-[11px] font-semibold ${
                    isUser
                      ? 'text-sky-100'
                      : message.isError
                      ? 'text-rose-700'
                      : 'text-slate-500'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {message.isError && <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />}
                    {isUser ? 'Você' : activePersona.name}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="opacity-75">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {!isUser && !message.isError && (
                      <>
                        {onCreateFlashcard && message.id !== 'welcome-msg' && (
                          <button
                            type="button"
                            onClick={() => handleCreateFlashcardFromMessage(message, idx)}
                            className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center gap-1 text-[11px]"
                            title="Transformar resposta em Flashcard"
                          >
                            {savedCardId === message.id ? (
                              <span className="text-emerald-600 font-bold flex items-center gap-1">
                                <Check className="w-3 h-3" /> Salvo!
                              </span>
                            ) : (
                              <>
                                <Layers className="w-3 h-3" />
                                <span className="hidden sm:inline">Flashcard</span>
                              </>
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => handleCopyMessage(message.id, message.content)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:text-slate-900"
                          title="Copiar resposta"
                        >
                          {copiedId === message.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`prose prose-sm max-w-none leading-relaxed break-words ${
                    isUser
                      ? 'text-white prose-invert prose-p:leading-relaxed prose-pre:bg-sky-700'
                      : 'text-slate-800 prose-headings:text-slate-900 prose-a:text-sky-600 prose-code:text-sky-700 prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-pre:bg-slate-900 prose-pre:text-slate-100'
                  }`}
                >
                  <div className="markdown-body">
                    <Markdown>{message.content}</Markdown>
                  </div>
                </div>

                {/* Direct Retry Action on Failed Messages */}
                {message.isError && (
                  <div className="mt-3 pt-3 border-t border-rose-200/80 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleRetry(message.id, message.failedUserMessage)}
                      disabled={isLoading}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reenviar mensagem
                    </button>

                    {selectedModel !== 'gemini-3.1-flash-lite' && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedModel('gemini-3.1-flash-lite');
                          handleRetry(message.id, message.failedUserMessage, 'gemini-3.1-flash-lite');
                        }}
                        disabled={isLoading}
                        className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        Tentar com Flash Lite
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Thinking Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center shrink-0 text-white text-xs font-bold shadow-xs animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-4 shadow-xs text-sm text-slate-600 flex items-center gap-3">
              <span className="flex space-x-1">
                <span className="w-2 h-2 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-sky-600 rounded-full animate-bounce"></span>
              </span>
              <span className="text-xs font-medium text-slate-500">
                {activePersona.name} analisando com {selectedModel}...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts if few messages */}
      {messages.length <= 2 && !isLoading && (
        <div className="px-4 py-2.5 bg-white border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-500 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Sugestões de perguntas estratégicas para FGV:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_PROMPTS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedPersona(item.persona);
                  handleSendMessage(item.prompt);
                }}
                className="px-2.5 py-1 rounded-full text-xs bg-slate-100 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 border border-slate-200 text-slate-700 transition-colors text-left"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-end gap-2"
        >
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Pergunte ao ${activePersona.name} sobre o edital, conceitos de TI ou recursos... (Enter para enviar)`}
              disabled={isLoading}
              className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-xs shrink-0 cursor-pointer disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </form>

        <div className="flex items-center justify-between mt-2 text-[11px] text-slate-400 px-1">
          <span>Pressione Enter para enviar, Shift + Enter para quebrar linha</span>
          <span className="font-mono">{selectedModel}</span>
        </div>
      </div>
    </div>
  );
};
