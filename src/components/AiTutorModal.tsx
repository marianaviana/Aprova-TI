import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, BookOpen, AlertCircle } from 'lucide-react';
import { Question } from '../types';

interface AiTutorModalProps {
  question: Question;
  userAnswer?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({
  question,
  userAnswer,
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAsk = async (customPrompt?: string) => {
    const textToAsk = customPrompt || query || 'Explique detalhadamente como resolver esta questão segundo o entendimento da banca FGV.';
    setLoading(true);
    try {
      const res = await fetch('/api/explain-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          userAnswer,
          userQuery: textToAsk,
        }),
      });
      const data = await res.json();
      setExplanation(data.explanation || 'Não foi possível gerar a explicação no momento.');
    } catch (err: any) {
      setExplanation('Erro ao conectar com o tutor de IA: ' + (err?.message || 'Tente novamente'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-sky-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">Mentor de Concursos IA (FGV)</h3>
              <p className="text-xs text-sky-100">
                Tire dúvidas técnicas sobre o edital e a lógica da banca
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Question context chip */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
            <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
              Tópico: {question.topicName}
            </div>
            <p className="line-clamp-2 text-slate-600 italic">"{question.statement}"</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="font-bold text-emerald-700">
                Gabarito: {question.correctOptionId}
              </span>
              {userAnswer && (
                <span className={`font-medium ${userAnswer === question.correctOptionId ? 'text-emerald-600' : 'text-rose-600'}`}>
                  • Sua marcação: {userAnswer}
                </span>
              )}
            </div>
          </div>

          {/* Quick Prompts */}
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Dúvidas frequentes:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleAsk('Qual é a pegadinha ou casca de banana clássica da FGV nessa questão?')}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
              >
                🔎 Qual é a "casca de banana" da banca?
              </button>
              <button
                type="button"
                onClick={() => handleAsk('Dê um mnemônico ou regra prática para nunca mais esquecer este conceito.')}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
              >
                💡 Criar um mnemônico memorável
              </button>
              <button
                type="button"
                onClick={() => handleAsk('Explique detalhadamente por que o gabarito oficial é o mais defensável juridicamente/tecnicamente.')}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
              >
                📚 Fundamentação aprofundada
              </button>
            </div>
          </div>

          {/* AI Response Output */}
          {loading ? (
            <div className="p-6 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
              <div className="w-7 h-7 border-3 border-sky-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-medium">O mentor está formulando a explicação pedagógica...</p>
            </div>
          ) : explanation ? (
            <div className="bg-sky-50/70 p-4 rounded-xl border border-sky-200 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed">
              <div className="flex items-center gap-2 text-sky-800 font-bold mb-2 text-xs">
                <Bot className="w-4 h-4 text-sky-600" />
                Explicação do Examinador Virtual:
              </div>
              {explanation}
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-dashed border-slate-200 text-center text-slate-400 text-xs">
              Selecione uma dúvida acima ou digite sua pergunta específica abaixo para receber auxílio da IA.
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Ex: Por que a alternativa D está incorreta?"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
          />
          <button
            onClick={() => handleAsk()}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-medium text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Perguntar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
