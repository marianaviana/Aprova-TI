import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SimuladoSetup } from './components/SimuladoSetup';
import { QuizView } from './components/QuizView';
import { SimuladoResult } from './components/SimuladoResult';
import { PerformanceDashboard } from './components/PerformanceDashboard';
import { CadernoDeErros } from './components/CadernoDeErros';
import { SyllabusViewer } from './components/SyllabusViewer';
import {
  ExamId,
  Question,
  QuestionFormat,
  SimuladoMode,
  SimuladoSession,
  UserAnswer,
  PerformanceStats,
} from './types';
import { EXAMS_INFO, SYLLABUS_DATA } from './data/syllabusData';
import { CURATED_QUESTIONS } from './data/curatedQuestions';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'simulado' | 'dashboard' | 'erros' | 'edital'>('simulado');
  const [selectedExamId, setSelectedExamId] = useState<ExamId>('seplag');

  // Simulado progress state
  const [simuladoStatus, setSimuladoStatus] = useState<'setup' | 'in_progress' | 'result'>('setup');
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentSimuladoMode, setCurrentSimuladoMode] = useState<SimuladoMode>('treino');
  const [currentSession, setCurrentSession] = useState<SimuladoSession | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // Local Storage Data: Sessions and Error Questions
  const [sessions, setSessions] = useState<SimuladoSession[]>(() => {
    try {
      const saved = localStorage.getItem('simulados_ti_sessions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [errorQuestions, setErrorQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem('simulados_ti_errors');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage when updated
  useEffect(() => {
    try {
      localStorage.setItem('simulados_ti_sessions', JSON.stringify(sessions));
    } catch (e) {
      console.warn('LocalStorage save failed for sessions', e);
    }
  }, [sessions]);

  useEffect(() => {
    try {
      localStorage.setItem('simulados_ti_errors', JSON.stringify(errorQuestions));
    } catch (e) {
      console.warn('LocalStorage save failed for errors', e);
    }
  }, [errorQuestions]);

  // Compute aggregate statistics
  const computeStats = (): PerformanceStats => {
    let totalQuestions = 0;
    let totalCorrect = 0;
    const bySubject: PerformanceStats['bySubject'] = {};
    const byExam: PerformanceStats['byExam'] = {
      seplag: { total: 0, correct: 0, percentage: 0 },
      dataprev: { total: 0, correct: 0, percentage: 0 },
    };

    sessions.forEach((s) => {
      s.answers.forEach((ans) => {
        totalQuestions++;
        if (ans.isCorrect) totalCorrect++;

        // by exam
        if (byExam[s.examId]) {
          byExam[s.examId].total++;
          if (ans.isCorrect) byExam[s.examId].correct++;
        }

        // by subject
        const q = s.questions.find((item) => item.id === ans.questionId);
        if (q) {
          if (!bySubject[q.subjectId]) {
            bySubject[q.subjectId] = {
              subjectName: q.subjectName,
              total: 0,
              correct: 0,
              percentage: 0,
            };
          }
          bySubject[q.subjectId].total++;
          if (ans.isCorrect) bySubject[q.subjectId].correct++;
        }
      });
    });

    // Calculate percentages
    Object.keys(bySubject).forEach((subId) => {
      const item = bySubject[subId];
      item.percentage = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
    });

    ['seplag', 'dataprev'].forEach((eId) => {
      const item = byExam[eId as ExamId];
      item.percentage = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
    });

    const overallPercentage =
      totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    return {
      totalSimulados: sessions.length,
      totalQuestionsAnswered: totalQuestions,
      totalCorrect,
      overallPercentage,
      bySubject,
      byExam,
    };
  };

  // Start Simulado handler
  const handleStartSimulado = async (config: {
    examId: ExamId;
    profileId?: string;
    selectedSubjectIds: string[];
    format: QuestionFormat;
    mode: SimuladoMode;
    count: number;
    useAi: boolean;
    difficulty: 'Médio' | 'Difícil';
  }) => {
    setCurrentSimuladoMode(config.mode);
    setIsLoadingAi(true);

    try {
      if (config.useAi) {
        // Request server to generate questions with Gemini
        const res = await fetch('/api/generate-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            examId: config.examId,
            profileId: config.profileId,
            subjectId:
              config.selectedSubjectIds[0] === 'all'
                ? undefined
                : config.selectedSubjectIds[0],
            format: config.format,
            count: config.count,
            difficulty: config.difficulty,
          }),
        });

        const data = await res.json();
        if (data.questions && data.questions.length > 0) {
          setCurrentQuestions(data.questions);
          setSimuladoStatus('in_progress');
          setIsLoadingAi(false);
          return;
        }
      }

      // Fallback or Curated questions mode
      let pool = CURATED_QUESTIONS.filter((q) => q.examId === config.examId);
      if (config.format) {
        pool = pool.filter((q) => q.format === config.format);
      }
      if (
        config.selectedSubjectIds &&
        config.selectedSubjectIds.length > 0 &&
        !config.selectedSubjectIds.includes('all')
      ) {
        pool = pool.filter((q) => config.selectedSubjectIds.includes(q.subjectId));
      }

      if (pool.length === 0) {
        pool = CURATED_QUESTIONS.filter((q) => q.examId === config.examId);
      }

      if (pool.length === 0) {
        pool = CURATED_QUESTIONS;
      }

      // Randomize & slice
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(config.count, shuffled.length));

      setCurrentQuestions(selected);
      setSimuladoStatus('in_progress');
    } catch (err) {
      console.error('Failed to generate or load questions', err);
      // Emergency fallback
      setCurrentQuestions(CURATED_QUESTIONS.slice(0, config.count));
      setSimuladoStatus('in_progress');
    } finally {
      setIsLoadingAi(false);
    }
  };

  // Finish Simulado handler
  const handleFinishQuiz = (answers: UserAnswer[], totalTimeSeconds: number) => {
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const scorePercentage = Math.round((correctCount / currentQuestions.length) * 100);

    // Build subject breakdown
    const subjectBreakdown: SimuladoSession['subjectBreakdown'] = {};
    currentQuestions.forEach((q) => {
      const userAns = answers.find((a) => a.questionId === q.id);
      if (!subjectBreakdown[q.subjectId]) {
        subjectBreakdown[q.subjectId] = {
          subjectName: q.subjectName,
          total: 0,
          correct: 0,
          percentage: 0,
        };
      }
      subjectBreakdown[q.subjectId].total++;
      if (userAns?.isCorrect) {
        subjectBreakdown[q.subjectId].correct++;
      }
    });

    Object.keys(subjectBreakdown).forEach((id) => {
      const item = subjectBreakdown[id];
      item.percentage = Math.round((item.correct / item.total) * 100);
    });

    const newSession: SimuladoSession = {
      id: `session-${Date.now()}`,
      date: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      examId: selectedExamId,
      mode: currentSimuladoMode,
      format: currentQuestions[0]?.format || 'multipla_escolha',
      totalQuestions: currentQuestions.length,
      correctCount,
      scorePercentage,
      totalTimeSeconds,
      answers,
      questions: currentQuestions,
      subjectBreakdown,
    };

    // Save session
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSession(newSession);

    // Save errors to Caderno de Erros
    const missedQuestions = currentQuestions.filter((q) => {
      const ans = answers.find((a) => a.questionId === q.id);
      return !ans || !ans.isCorrect;
    });

    if (missedQuestions.length > 0) {
      setErrorQuestions((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const newlyMissed = missedQuestions.filter((item) => !existingIds.has(item.id));
        return [...newlyMissed, ...prev];
      });
    }

    setSimuladoStatus('result');
  };

  // Retry missed questions
  const handleRetryErrors = (questionsToRetry: Question[]) => {
    setCurrentQuestions(questionsToRetry);
    setCurrentSimuladoMode('treino');
    setSimuladoStatus('in_progress');
    setCurrentTab('simulado');
  };

  // Start subject directly from Syllabus Viewer
  const handleStartSubjectFromSyllabus = (subjectId: string, examId: ExamId) => {
    setSelectedExamId(examId);
    handleStartSimulado({
      examId,
      selectedSubjectIds: [subjectId],
      format: 'multipla_escolha',
      mode: 'treino',
      count: 5,
      useAi: true,
      difficulty: 'Difícil',
    });
    setCurrentTab('simulado');
  };

  // Remove question from error notebook
  const handleRemoveError = (questionId: string) => {
    setErrorQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  const handleClearAllErrors = () => {
    if (window.confirm('Deseja realmente limpar todo o caderno de erros?')) {
      setErrorQuestions([]);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Deseja realmente limpar todo o histórico de simulados?')) {
      setSessions([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-sky-100 selection:text-sky-900">
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'simulado' && simuladoStatus === 'result') {
            // Keep on result or setup
          }
        }}
        selectedExamId={selectedExamId}
        onSelectExamId={(id) => {
          setSelectedExamId(id);
          if (simuladoStatus === 'setup') {
            // Already in setup
          }
        }}
        savedErrorsCount={errorQuestions.length}
      />

      <main className="flex-1 pb-16">
        {currentTab === 'simulado' && (
          <>
            {simuladoStatus === 'setup' && (
              <SimuladoSetup
                selectedExamId={selectedExamId}
                onSelectExamId={setSelectedExamId}
                onStartSimulado={handleStartSimulado}
                isLoadingAi={isLoadingAi}
              />
            )}

            {simuladoStatus === 'in_progress' && (
              <QuizView
                questions={currentQuestions}
                mode={currentSimuladoMode}
                examName={EXAMS_INFO[selectedExamId]?.name || 'Simulado TI'}
                onFinishQuiz={handleFinishQuiz}
                onCancelQuiz={() => setSimuladoStatus('setup')}
              />
            )}

            {simuladoStatus === 'result' && currentSession && (
              <SimuladoResult
                session={currentSession}
                onRestartNewSimulado={() => setSimuladoStatus('setup')}
                onRetryErrorsOnly={(errors) => handleRetryErrors(errors)}
                onGoToDashboard={() => setCurrentTab('dashboard')}
              />
            )}
          </>
        )}

        {currentTab === 'dashboard' && (
          <PerformanceDashboard
            stats={computeStats()}
            sessions={sessions}
            onSelectSessionToReview={(sess) => {
              setCurrentSession(sess);
              setSimuladoStatus('result');
              setCurrentTab('simulado');
            }}
            onClearHistory={handleClearHistory}
            onStartTargetedSimulado={(subjId, exId) => {
              handleStartSubjectFromSyllabus(subjId, exId);
            }}
          />
        )}

        {currentTab === 'erros' && (
          <CadernoDeErros
            errorQuestions={errorQuestions}
            onRetryQuestions={handleRetryErrors}
            onRemoveError={handleRemoveError}
            onClearAllErrors={handleClearAllErrors}
          />
        )}

        {currentTab === 'edital' && (
          <SyllabusViewer onStartSubjectSimulado={handleStartSubjectFromSyllabus} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Simulador de Concursos Públicos de TI • SEPLAG-RJ (APO TI) & DATAPREV (FGV 2026)
          </span>
          <span className="text-slate-400">
            Powered by Google Gemini IA & Conhecimento Estratégico FGV
          </span>
        </div>
      </footer>
    </div>
  );
}
