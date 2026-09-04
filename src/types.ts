export type ExamId = 'seplag' | 'dataprev' | 'transpetro' | 'abgf';

export type QuestionFormat = 'multipla_escolha' | 'certo_errado';

export type SimuladoMode = 'treino' | 'prova'; // Treino = Estudo com gabarito imediato e Mentor IA; Prova = Prova Real com timer regressivo e sem IA

export type PenaltyRule = 'none' | 'cebraspe'; // 'none' = FGV/FCC/Cesgranrio (1 acerto = 1 pt); 'cebraspe' = 1 errada anula 1 certa (líquida)

export type FlashcardDifficulty = 'facil' | 'medio' | 'dificil' | 'novo';

export interface Flashcard {
  id: string;
  front: string; // Pergunta, conceito-chave ou caso prático
  back: string; // Resposta explicativa, mnemônico ou fundamentação
  tags: string[]; // ex: ['COBIT 2019', 'Governança', 'FGV']
  subjectName?: string;
  topicName?: string;
  examId?: ExamId;
  source: 'mentor' | 'caderno_erros' | 'manual' | 'simulado';
  difficulty: FlashcardDifficulty;
  timesReviewed: number;
  lastReviewed?: string;
  createdAt: string;
}

export interface SyllabusTopic {
  id: string;
  name: string;
  subtopics: string[];
}

export interface SyllabusSubject {
  id: string;
  name: string;
  examId: ExamId;
  profileId?: string; // Para Dataprev onde há perfis diferentes
  isSpecificKnowledge: boolean; // Conhecimentos Específicos vs Gerais
  weight?: number;
  questionCountEdital?: number;
  topics: SyllabusTopic[];
}

export interface ExamInfo {
  id: ExamId;
  name: string;
  shortName: string;
  organ: string;
  banca: string;
  year: number;
  role: string;
  totalQuestionsEdital: number;
  minApprovalPercentage: number;
  discursiveInfo: string;
  profiles?: { id: string; name: string; description: string }[];
}

export interface QuestionOption {
  id: string; // 'A', 'B', 'C', 'D', 'E' ou 'C', 'E'
  text: string;
}

export interface Question {
  id: string;
  examId: ExamId;
  profileId?: string;
  subjectId: string;
  subjectName: string;
  topicName: string;
  format: QuestionFormat;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  statement: string; // Enunciado da questão (caso prático, contextualizado no estilo FGV)
  options: QuestionOption[];
  correctOptionId: string; // 'A', 'B', 'C', 'D', 'E' ou 'C', 'E'
  justification: string; // Justificativa detalhada e fundamentada
  distractorExplanations?: Record<string, string>; // Por que as outras estão erradas
  syllabusCitation: string; // Citação exata do tópico do edital
  isAiGenerated?: boolean;
  focusDistractors?: boolean; // Se a questão foi gerada ou identificada com pegadinhas/distratores avançados FGV
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface SubjectPerformance {
  subjectName: string;
  total: number;
  correct: number;
  percentage: number;
}

export interface SimuladoSession {
  id: string;
  date: string;
  examId: ExamId;
  profileId?: string;
  mode: SimuladoMode;
  format: QuestionFormat;
  penaltyRule?: PenaltyRule;
  netScore?: number;
  timeLimitMinutes?: number;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  totalTimeSeconds: number;
  avgTimePerQuestionSeconds?: number;
  bottleneckCount?: number; // Questões com tempo > 3 min (180 segundos)
  focusDistractors?: boolean;
  answers: UserAnswer[];
  questions: Question[];
  subjectBreakdown: Record<string, SubjectPerformance>;
}

export interface PerformanceStats {
  totalSimulados: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  overallPercentage: number;
  bySubject: Record<string, SubjectPerformance>;
  byExam: Record<
    ExamId,
    {
      total: number;
      correct: number;
      percentage: number;
    }
  >;
}

export type ChatRole = 'user' | 'model';

export type ChatbotPersona = 'professor' | 'recursos' | 'flash_lite' | 'examinador_pro';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
  isError?: boolean;
  canRetry?: boolean;
  failedUserMessage?: string;
  contextQuestion?: {
    id: string;
    statement: string;
    correctOptionId: string;
  };
}
