import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Target,
  Award,
  Clock,
  History,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Sparkles,
  ArrowUpRight,
  BookOpen,
} from 'lucide-react';
import { PerformanceStats, SimuladoSession, ExamId, SubjectPerformance } from '../types';
import { EXAMS_INFO } from '../data/syllabusData';

interface PerformanceDashboardProps {
  stats: PerformanceStats;
  sessions: SimuladoSession[];
  onSelectSessionToReview: (session: SimuladoSession) => void;
  onClearHistory: () => void;
  onStartTargetedSimulado: (subjectId: string, examId: ExamId) => void;
}

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  stats,
  sessions,
  onSelectSessionToReview,
  onClearHistory,
  onStartTargetedSimulado,
}) => {
  const subjectsList = Object.entries(stats.bySubject) as [string, SubjectPerformance][];

  // Identify weak areas (< 60%) and strong areas (>= 75%)
  const weakSubjects = subjectsList.filter(([, s]) => s.total >= 2 && s.percentage < 60);
  const strongSubjects = subjectsList.filter(([, s]) => s.total >= 2 && s.percentage >= 75);

  const formatMinutes = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Painel de Desempenho & Métricas
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Acompanhe seu índice de acertos por disciplina e a evolução histórica nos simulados
          </p>
        </div>

        {sessions.length > 0 && (
          <button
            onClick={onClearHistory}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Limpar Histórico
          </button>
        )}
      </div>

      {/* Global Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Taxa Global */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Aproveitamento</span>
            <Target className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900">
            {stats.overallPercentage}%
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Meta edital FGV: mínimo 50%
          </p>
        </div>

        {/* Questões Resolvidas */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Questões Feitas</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900">
            {stats.totalQuestionsAnswered}
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-1">
            {stats.totalCorrect} acertos acumulados
          </p>
        </div>

        {/* Total Simulados */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Simulados Feitos</span>
            <History className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900">
            {stats.totalSimulados}
          </div>
          <p className="text-xs text-slate-500 mt-1">Sessões completas registradas</p>
        </div>

        {/* Desempenho por Edital */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Por Edital</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="font-semibold text-slate-700">SEPLAG-RJ:</span>
              <span className="font-bold text-sky-700">
                {stats.byExam.seplag.percentage}% ({stats.byExam.seplag.correct}/{stats.byExam.seplag.total})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-slate-700">DATAPREV:</span>
              <span className="font-bold text-indigo-700">
                {stats.byExam.dataprev.percentage}% ({stats.byExam.dataprev.correct}/{stats.byExam.dataprev.total})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DISCIPLINAS & RADAR DE PRIORIDADES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Desempenho por Matéria Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Aproveitamento por Disciplina
              </h2>
              <p className="text-xs text-slate-500">
                Taxa de acertos discriminada por conteúdo programático
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {subjectsList.length} matérias praticadas
            </span>
          </div>

          {subjectsList.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              Nenhum simulado finalizado ainda. Inicie seu primeiro simulado para gerar as estatísticas por matéria!
            </div>
          ) : (
            <div className="space-y-4">
              {subjectsList.map(([subjectId, data]) => {
                return (
                  <div key={subjectId} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">
                        {data.subjectName}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">
                          {data.correct} de {data.total} questões
                        </span>
                        <span className="font-bold text-slate-900 w-12 text-right">
                          {data.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          data.percentage >= 75
                            ? 'bg-emerald-500'
                            : data.percentage >= 50
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${data.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Diagnóstico Tático & Atenção Imediata */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Diagnóstico Estratégico</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Recomendações baseadas na convergência FGV dos editais
            </p>

            {/* Weak Alert */}
            {weakSubjects.length > 0 ? (
              <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-200 text-xs text-rose-900 mb-4 space-y-2">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Pontos de Atenção (&lt;60%):</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-rose-800">
                  {weakSubjects.map(([id, s]) => (
                    <li key={id}>
                      {s.subjectName} ({s.percentage}%)
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-xs text-emerald-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Nenhuma disciplina crítica abaixo de 60%! Mantenha o ritmo de revisões.</span>
              </div>
            )}

            {/* Bloco Realeza Reminder */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1 text-slate-700">
              <span className="font-bold text-slate-900 block">
                👑 Núcleo Duro da FGV (Bloco Realeza):
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Priorize Governança (COBIT 2019 e ITIL 4), DAMA-DMBOK, Modelagem de Processos (BPMN), SQL e Segurança (ISO 27001/LGPD). Estas disciplinas compõem a maior densidade de questões nos dois editais!
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <span className="text-[11px] text-slate-400 block text-center">
              Critério eliminatório do edital: não zerar nenhuma disciplina.
            </span>
          </div>
        </div>
      </div>

      {/* HISTÓRICO DE SESSÕES */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Histórico das Sessões de Simulado
            </h3>
            <p className="text-xs text-slate-500">
              Revise simulados concluídos e acompanhe sua curva de aprendizado
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {sessions.length} sessões registradas
          </span>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-xs">
            Nenhuma sessão registrada. Complete um simulado para registrar seu histórico aqui!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Data/Hora</th>
                  <th className="py-3 px-4">Edital</th>
                  <th className="py-3 px-4">Modo / Formato</th>
                  <th className="py-3 px-4">Acertos</th>
                  <th className="py-3 px-4">Tempo</th>
                  <th className="py-3 px-4">Aproveitamento</th>
                  <th className="py-3 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sessions.map((sess) => {
                  const exam = EXAMS_INFO[sess.examId] || EXAMS_INFO.seplag;
                  const passed = sess.scorePercentage >= 50;

                  return (
                    <tr key={sess.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        {sess.date}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900">
                          {exam.shortName}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <span className="capitalize">{sess.mode}</span> •{' '}
                        {sess.format === 'multipla_escolha' ? 'Múltipla Escolha' : 'Certo/Errado'}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {sess.correctCount}/{sess.totalQuestions}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono">
                        {formatMinutes(sess.totalTimeSeconds)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                            passed
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {sess.scorePercentage}% {passed ? '✓' : '✗'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onSelectSessionToReview(sess)}
                          className="px-2.5 py-1 rounded bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold transition-colors cursor-pointer"
                        >
                          Revisar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
