import React, { useState } from 'react';
import {
  BookmarkCheck,
  RotateCcw,
  Trash2,
  BookOpen,
  Sparkles,
  Search,
  Filter,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Question } from '../types';
import { AiTutorModal } from './AiTutorModal';

interface CadernoDeErrosProps {
  errorQuestions: Question[];
  onRetryQuestions: (questions: Question[]) => void;
  onRemoveError: (questionId: string) => void;
  onClearAllErrors: () => void;
}

export const CadernoDeErros: React.FC<CadernoDeErrosProps> = ({
  errorQuestions,
  onRetryQuestions,
  onRemoveError,
  onClearAllErrors,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExam, setFilterExam] = useState<'all' | 'seplag' | 'dataprev'>('all');
  const [selectedAiQuestion, setSelectedAiQuestion] = useState<Question | null>(null);

  const filtered = errorQuestions.filter((q) => {
    if (filterExam !== 'all' && q.examId !== filterExam) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        q.statement.toLowerCase().includes(term) ||
        q.subjectName.toLowerCase().includes(term) ||
        q.topicName.toLowerCase().includes(term) ||
        q.syllabusCitation.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 mb-2 border border-rose-200">
            <BookmarkCheck className="w-3.5 h-3.5 text-rose-600" />
            Engenharia Reversa & Revisão Ativa
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Caderno de Erros
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Questões que você errou nos simulados reunidas para repetição espaçada e fixação
          </p>
        </div>

        {errorQuestions.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onRetryQuestions(filtered)}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Modo Revanche (Refazer {filtered.length})
            </button>
            <button
              onClick={onClearAllErrors}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-rose-600 transition-colors"
              title="Limpar todas as questões do caderno"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-6 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por termo, disciplina, COBIT, ITIL, SQL, LGPD..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterExam('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterExam === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Todos ({errorQuestions.length})
          </button>
          <button
            onClick={() => setFilterExam('seplag')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterExam === 'seplag'
                ? 'bg-sky-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            SEPLAG-RJ
          </button>
          <button
            onClick={() => setFilterExam('dataprev')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterExam === 'dataprev'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            DATAPREV
          </button>
        </div>
      </div>

      {/* List of Error Questions */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {errorQuestions.length === 0
              ? 'Seu caderno de erros está vazio!'
              : 'Nenhuma questão encontrada com o filtro atual.'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            {errorQuestions.length === 0
              ? 'Quando você errar alguma questão durante os simulados, ela será salva aqui automaticamente para você refazer até dominar.'
              : 'Tente alterar os termos de busca ou o filtro de edital acima.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((q, idx) => (
            <div
              key={q.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-4"
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                    {q.examId === 'seplag' ? 'SEPLAG-RJ' : 'DATAPREV'}
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    {q.subjectName}
                  </span>
                  <span className="text-[11px] text-slate-500 hidden sm:inline">
                    • {q.topicName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedAiQuestion(q)}
                    className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    <span className="hidden sm:inline">Mentor IA</span>
                  </button>
                  <button
                    onClick={() => onRemoveError(q.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Remover do caderno (questão já dominada)"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Statement */}
              <p className="text-xs sm:text-sm text-slate-900 leading-relaxed whitespace-pre-line bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80">
                {q.statement}
              </p>

              {/* Options */}
              <div className="space-y-1.5">
                {q.options.map((opt) => {
                  const isCorrect = opt.id === q.correctOptionId;
                  return (
                    <div
                      key={opt.id}
                      className={`p-2.5 rounded-lg text-xs flex items-start gap-2.5 border ${
                        isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded font-bold text-[11px] flex items-center justify-center shrink-0 ${
                          isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="flex-1 leading-relaxed pt-0.5">{opt.text}</span>
                      {isCorrect && (
                        <span className="text-[10px] font-bold text-emerald-700 shrink-0">
                          (Gabarito Correto)
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Syllabus Citation */}
              <div className="bg-sky-50/60 p-2.5 rounded-lg border border-sky-200 text-xs text-slate-700 flex items-start gap-2">
                <BookOpen className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sky-950">Tópico do Edital: </span>
                  <span>{q.syllabusCitation}</span>
                </div>
              </div>

              {/* Justification */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                <span className="font-bold text-slate-900 block mb-1">
                  Fundamentação Técnica / Por que você errou:
                </span>
                {q.justification}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Tutor Modal */}
      {selectedAiQuestion && (
        <AiTutorModal
          isOpen={!!selectedAiQuestion}
          onClose={() => setSelectedAiQuestion(null)}
          question={selectedAiQuestion}
        />
      )}
    </div>
  );
};
