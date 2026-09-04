import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  Sparkles,
  BookOpen,
  Filter,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Timer,
  AlertTriangle,
  Target,
} from 'lucide-react';
import { SimuladoSession, Question, UserAnswer, ExamId, SubjectPerformance } from '../types';
import { EXAMS_INFO } from '../data/syllabusData';
import { AiTutorModal } from './AiTutorModal';

interface SimuladoResultProps {
  session: SimuladoSession;
  onRestartNewSimulado: () => void;
  onRetryErrorsOnly: (errorQuestions: Question[]) => void;
  onGoToDashboard: () => void;
}

export const SimuladoResult: React.FC<SimuladoResultProps> = ({
  session,
  onRestartNewSimulado,
  onRetryErrorsOnly,
  onGoToDashboard,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'correct' | 'errors'>('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const [selectedAiQuestion, setSelectedAiQuestion] = useState<Question | null>(null);

  const exam = EXAMS_INFO[session.examId] || EXAMS_INFO.seplag;
  const isPassed = session.scorePercentage >= 50;

  // Trigger celebration confetti on high scores
  useEffect(() => {
    if (session.scorePercentage >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [session.scorePercentage]);

  const toggleExpand = (qId: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const errorQuestions = session.questions.filter((q) => {
    const userAns = session.answers.find((a) => a.questionId === q.id);
    return !userAns || !userAns.isCorrect;
  });

  const filteredQuestions = session.questions.filter((q) => {
    const userAns = session.answers.find((a) => a.questionId === q.id);
    const isCorrect = !!userAns?.isCorrect;
    if (filterMode === 'correct') return isCorrect;
    if (filterMode === 'errors') return !isCorrect;
    return true;
  });

  const formatMinutes = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const totalQuestionsCount = Math.max(1, session.totalQuestions);
  const avgSeconds =
    session.avgTimePerQuestionSeconds ??
    Math.round(session.totalTimeSeconds / totalQuestionsCount);
  const bottleneckCount =
    session.bottleneckCount ??
    session.answers.filter((a) => (a.timeSpentSeconds || 0) > 180).length;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Overview Score Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md mb-8">
        <div className="text-center max-w-2xl mx-auto">
          <div
            className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 ${
              isPassed
                ? 'bg-emerald-100 text-emerald-600'
                : 'bg-amber-100 text-amber-600'
            }`}
          >
            {isPassed ? <Trophy className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
            {exam.name} • {session.mode === 'treino' ? 'Modo Treino' : 'Modo Simulado Prova'}
          </span>

          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
            Resultado do Simulado
          </h1>

          {/* Big Score Number */}
          <div className="my-6">
            <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
              {session.scorePercentage}%
            </div>
            <p className="text-sm font-medium text-slate-500 mt-1">
              {session.correctCount} acertos de {session.totalQuestions} questões resolvidas
            </p>
          </div>

          {/* Edital Pass / Fail Indicator Rule */}
          <div
            className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium mb-6 ${
              isPassed
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}
          >
            {isPassed ? (
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>
                  <strong>Atingiu o ponto de corte do edital!</strong> (Mínimo de 50% de acertos exigido pela banca FGV).
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <span>
                  <strong>Abaixo do ponto de corte (50%).</strong> O edital FGV exige mínimo de 50% dos pontos para não ser eliminado.
                </span>
              </div>
            )}
          </div>

          {/* Gestão de Tempo FGV: Quick Metrics com Tempo Médio e Alerta de Gargalos */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-slate-100 text-center">
            <div className="p-2">
              <span className="text-xs text-slate-500 block">Acertos</span>
              <span className="text-lg font-bold text-emerald-600">
                {session.correctCount}
              </span>
            </div>
            <div className="p-2">
              <span className="text-xs text-slate-500 block">Erros</span>
              <span className="text-lg font-bold text-rose-600">
                {session.totalQuestions - session.correctCount}
              </span>
            </div>
            <div className="p-2">
              <span className="text-xs text-slate-500 block">Tempo Total</span>
              <span className="text-lg font-bold text-slate-700">
                {formatMinutes(session.totalTimeSeconds)}
              </span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <span className="text-xs text-slate-500 block">Média / Questão</span>
              <span className={`text-lg font-bold ${avgSeconds > 180 ? 'text-amber-600' : 'text-slate-800'}`}>
                {formatMinutes(avgSeconds)}
              </span>
            </div>
            <div className={`p-2 rounded-xl ${bottleneckCount > 0 ? 'bg-amber-50 border border-amber-200' : 'bg-slate-50'}`}>
              <span className="text-xs text-slate-500 block">Gargalos (&gt; 3 min)</span>
              <span className={`text-lg font-bold ${bottleneckCount > 0 ? 'text-amber-600' : 'text-slate-700'}`}>
                {bottleneckCount}
              </span>
            </div>
          </div>
        </div>

        {/* Alerta de Gargalo de Tempo por Questão */}
        {bottleneckCount > 0 && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-3 text-xs sm:text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-amber-900 mb-0.5">
                Alerta de Ritmo de Prova: {bottleneckCount} {bottleneckCount === 1 ? 'questão exigiu' : 'questões exigiram'} mais de 3 minutos
              </div>
              <p className="text-amber-800 leading-relaxed">
                A banca FGV elabora enunciados longos e distratores densos exatamente para induzir o candidato a estourar o tempo. Questões com mais de 3 minutos de resolução foram sinalizadas com a tag <strong>⚠️ Gargalo (&gt; 3 min)</strong> na revisão abaixo. Pratique o descarte rápido de alternativas falsas para manter a média de 2min30s.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
          {errorQuestions.length > 0 && (
            <button
              onClick={() => onRetryErrorsOnly(errorQuestions)}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Refazer {errorQuestions.length} Questões Erradas
            </button>
          )}

          <button
            onClick={onRestartNewSimulado}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Novo Simulado
          </button>

          <button
            onClick={onGoToDashboard}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>Ver Painel de Desempenho</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PAINEL DE DESEMPENHO POR MATÉRIA */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs mb-8">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span>Aproveitamento por Matéria / Disciplina</span>
        </h3>

        <div className="space-y-4">
          {(Object.entries(session.subjectBreakdown) as [string, SubjectPerformance][]).map(([subjectId, stats]) => (
            <div key={subjectId} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">
                  {stats.subjectName}
                </span>
                <span className="font-bold text-slate-700">
                  {stats.correct}/{stats.total} acertos ({stats.percentage}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    stats.percentage >= 70
                      ? 'bg-emerald-500'
                      : stats.percentage >= 50
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REVISÃO COMPLETA E GABARITO COMENTADO */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Gabarito Comentado & Revisão de Questões
            </h3>
            <p className="text-xs text-slate-500">
              Analise detalhadamente a justificativa e os tópicos de cada questão
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas ({session.questions.length})
            </button>
            <button
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'correct'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Acertos ({session.correctCount})
            </button>
            <button
              onClick={() => setFilterMode('errors')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'errors'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Erros ({session.totalQuestions - session.correctCount})
            </button>
          </div>
        </div>

        {/* Question Accordion Cards */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const userAns = session.answers.find((a) => a.questionId === q.id);
            const isCorrect = !!userAns?.isCorrect;
            const isExpanded = expandedQuestions[q.id] !== false; // expanded by default
            const qTimeSeconds = userAns?.timeSpentSeconds || 0;
            const isQBottleneck = qTimeSeconds > 180;

            return (
              <div
                key={q.id}
                className={`rounded-2xl border transition-all ${
                  isCorrect
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-rose-200 bg-rose-50/20'
                }`}
              >
                {/* Accordion Trigger */}
                <div
                  onClick={() => toggleExpand(q.id)}
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                        isCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-800">
                          {q.subjectName}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          • {q.topicName}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isCorrect ? 'Você Acertou' : 'Você Errou'}
                        </span>

                        {/* Tempo Gasto na Questão */}
                        {isQBottleneck ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 inline-flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-amber-600" />
                            Gargalo ({formatMinutes(qTimeSeconds)})
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 inline-flex items-center gap-1">
                            <Timer className="w-3 h-3 text-slate-500" />
                            {formatMinutes(qTimeSeconds)}
                          </span>
                        )}

                        {/* Tag Foco em Distratores FGV */}
                        {q.focusDistractors && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 inline-flex items-center gap-1">
                            <Target className="w-3 h-3 text-indigo-600" />
                            Distratores FGV
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 line-clamp-2">
                        {q.statement}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 shrink-0">
                    <span className="text-xs font-mono font-medium text-slate-500">
                      Gabarito: {q.correctOptionId}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-slate-200/60 space-y-4">
                    {/* Alerta individual de tempo na questão */}
                    {isQBottleneck && (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>
                          <strong>Alerta de Tempo ({formatMinutes(qTimeSeconds)}):</strong> Esta questão levou mais de 3 minutos para ser resolvida. Em provas FGV, procure diagnosticar os termos-chave logo na primeira leitura para evitar relecturas excessivas.
                        </span>
                      </div>
                    )}

                    {/* Full Statement */}
                    <p className="text-xs sm:text-sm text-slate-900 leading-relaxed whitespace-pre-line bg-white p-4 rounded-xl border border-slate-200">
                      {q.statement}
                    </p>

                    {/* Options list with highlight */}
                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const isThisCorrect = opt.id === q.correctOptionId;
                        const isThisUserSelected = userAns?.selectedOptionId === opt.id;

                        let style = 'border-slate-200 bg-white text-slate-700';
                        if (isThisCorrect) {
                          style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                        } else if (isThisUserSelected && !isThisCorrect) {
                          style = 'border-rose-500 bg-rose-50 text-rose-950 font-medium';
                        }

                        return (
                          <div
                            key={opt.id}
                            className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-3 ${style}`}
                          >
                            <span
                              className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center shrink-0 ${
                                isThisCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : isThisUserSelected
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {opt.id}
                            </span>
                            <span className="flex-1 leading-relaxed pt-0.5">
                              {opt.text}
                            </span>
                            {isThisCorrect && (
                              <span className="text-[11px] font-bold text-emerald-700 shrink-0">
                                (Gabarito Oficial)
                              </span>
                            )}
                            {isThisUserSelected && !isThisCorrect && (
                              <span className="text-[11px] font-bold text-rose-700 shrink-0">
                                (Sua escolha)
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* CITAÇÃO DO EDITAL */}
                    <div className="bg-sky-50/70 p-3 rounded-xl border border-sky-200 text-xs">
                      <span className="font-bold text-sky-900 block mb-0.5 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                        Tópico Referenciado do Edital:
                      </span>
                      <p className="text-slate-700 font-medium">{q.syllabusCitation}</p>
                    </div>

                    {/* JUSTIFICATIVA FUNDAMENTADA */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs sm:text-sm">
                      <span className="font-bold text-slate-900 block mb-1">
                        Comentário e Justificativa:
                      </span>
                      <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                        {q.justification}
                      </p>
                    </div>

                    {/* Distractor explanations if available */}
                    {q.distractorExplanations && Object.keys(q.distractorExplanations).length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                          Análise dos Distratores:
                        </span>
                        {Object.entries(q.distractorExplanations).map(([optId, exp]) => (
                          <div key={optId} className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-700 flex items-start gap-2">
                            <strong className="text-slate-900">{optId}:</strong>
                            <span>{exp}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tutor IA Button */}
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setSelectedAiQuestion(q)}
                        className="px-3.5 py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                        Tirar Dúvida Desta Questão com Mentor IA
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Tutor Modal for reviewed question */}
      {selectedAiQuestion && (
        <AiTutorModal
          isOpen={!!selectedAiQuestion}
          onClose={() => setSelectedAiQuestion(null)}
          question={selectedAiQuestion}
          userAnswer={session.answers.find((a) => a.questionId === selectedAiQuestion.id)?.selectedOptionId}
        />
      )}
    </div>
  );
};
