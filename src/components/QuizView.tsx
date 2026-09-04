import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BookOpen,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Flag,
  RotateCcw,
  Check,
  Strikethrough,
  Share2,
  ChevronDown,
  ChevronUp,
  Timer,
  Target,
  Keyboard,
} from 'lucide-react';
import { Question, QuestionFormat, SimuladoMode, UserAnswer } from '../types';
import { AiTutorModal } from './AiTutorModal';

interface QuizViewProps {
  questions: Question[];
  mode: SimuladoMode;
  examName: string;
  onFinishQuiz: (answers: UserAnswer[], totalTimeSeconds: number) => void;
  onCancelQuiz: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  mode,
  examName,
  onFinishQuiz,
  onCancelQuiz,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [eliminatedOptions, setEliminatedOptions] = useState<Record<string, string[]>>({}); // questionId -> optionIds crossed out
  const [confirmedQuestions, setConfirmedQuestions] = useState<Record<string, boolean>>({}); // for treino mode
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [questionTimeMap, setQuestionTimeMap] = useState<Record<string, number>>({});
  const [isRiscadorMode, setIsRiscadorMode] = useState<boolean>(false);

  const currentQuestion = questions[currentIndex];
  const isTreino = mode === 'treino';
  const isCurrentConfirmed = !!confirmedQuestions[currentQuestion.id];
  const currentSelectedOption = selectedAnswers[currentQuestion.id];
  const currentQuestionTime = questionTimeMap[currentQuestion.id] || 0;
  const isBottleneck = currentQuestionTime >= 180;

  // Timer: total exam time + individual per-question time
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      if (currentQuestion) {
        setQuestionTimeMap((prev) => ({
          ...prev,
          [currentQuestion.id]: (prev[currentQuestion.id] || 0) + 1,
        }));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestion?.id]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionId: string) => {
    if (isTreino && isCurrentConfirmed) return; // locked after confirmation in treino mode
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const toggleEliminateId = (optionId: string) => {
    if (isTreino && isCurrentConfirmed) return;
    const currentList = eliminatedOptions[currentQuestion.id] || [];
    if (currentList.includes(optionId)) {
      setEliminatedOptions((prev) => ({
        ...prev,
        [currentQuestion.id]: currentList.filter((id) => id !== optionId),
      }));
    } else {
      setEliminatedOptions((prev) => ({
        ...prev,
        [currentQuestion.id]: [...currentList, optionId],
      }));
    }
  };

  const handleToggleEliminate = (e: React.MouseEvent, optionId: string) => {
    e.stopPropagation();
    toggleEliminateId(optionId);
  };

  const handleOptionClick = (optionId: string) => {
    if (isRiscadorMode) {
      toggleEliminateId(optionId);
    } else {
      handleSelectOption(optionId);
    }
  };

  const handleConfirmAnswer = () => {
    if (!currentSelectedOption) return;
    setConfirmedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));
  };

  // Keyboard Shortcuts Listener (A-E select, Space/Right arrow advance/confirm, R toggle riscador, Left arrow previous)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when AI modal is open or user is typing in form controls
      if (isAiModalOpen) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      const key = e.key.toUpperCase();

      // Tecla R: Ativa/desativa o riscador de alternativas
      if (key === 'R') {
        e.preventDefault();
        setIsRiscadorMode((prev) => !prev);
        return;
      }

      // Teclas A, B, C, D, E: Selecionam as opções correspondentes (ou eliminam se modo riscador ativo)
      const validOptionKeys =
        currentQuestion.format === 'certo_errado'
          ? ['C', 'E']
          : ['A', 'B', 'C', 'D', 'E'];

      if (validOptionKeys.includes(key)) {
        e.preventDefault();
        if (isRiscadorMode) {
          toggleEliminateId(key);
        } else {
          handleSelectOption(key);
        }
        return;
      }

      // Tecla Espaço ou Seta para a Direita: Avança para a próxima ou confirma a resposta
      if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (isTreino && !isCurrentConfirmed && currentSelectedOption) {
          handleConfirmAnswer();
        } else if (currentIndex < questions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
        return;
      }

      // Tecla Seta para a Esquerda: Retorna para a questão anterior
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentQuestion,
    isTreino,
    isCurrentConfirmed,
    currentSelectedOption,
    currentIndex,
    questions.length,
    isAiModalOpen,
    isRiscadorMode,
    eliminatedOptions,
  ]);

  const toggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const handleFinish = () => {
    // Compile answers
    const answersList: UserAnswer[] = questions.map((q) => {
      const selected = selectedAnswers[q.id] || '';
      return {
        questionId: q.id,
        selectedOptionId: selected,
        isCorrect: selected === q.correctOptionId,
        timeSpentSeconds: questionTimeMap[q.id] || 15,
      };
    });

    onFinishQuiz(answersList, elapsedSeconds);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      {/* Top Bar / Status */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onCancelQuiz}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Sair
            </button>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
                {examName}
              </span>
              <span className="text-xs font-semibold text-slate-700">
                Questão {currentIndex + 1} de {questions.length}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Cronômetro Individual por Questão */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold border transition-all ${
                isBottleneck
                  ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-400/40 animate-pulse'
                  : currentQuestionTime >= 120
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-sky-50 text-sky-800 border-sky-200'
              }`}
              title={
                isBottleneck
                  ? 'Alerta: Mais de 3 minutos gastos nesta questão!'
                  : 'Tempo decorrido nesta questão'
              }
            >
              <Timer className="w-3.5 h-3.5 text-sky-600" />
              <span>Questão: {formatTime(currentQuestionTime)}</span>
              {isBottleneck && (
                <span className="px-1.5 py-0.2 rounded bg-amber-300 text-amber-950 text-[10px] font-extrabold uppercase">
                  &gt; 3 min
                </span>
              )}
            </div>

            {/* Cronômetro Total da Prova */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs font-semibold border border-slate-200"
              title="Tempo total decorrido no simulado"
            >
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Total:</span>
              <span>{formatTime(elapsedSeconds)}</span>
            </div>

            {/* Riscador Toggle Button [Tecla R] */}
            <button
              type="button"
              onClick={() => setIsRiscadorMode((prev) => !prev)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isRiscadorMode
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs ring-2 ring-amber-300'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
              title="Ativar/Desativar modo riscador de alternativas (Atalho: Tecla R)"
            >
              <Strikethrough className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Riscador</span>
              <kbd
                className={`px-1 rounded text-[10px] font-mono font-bold ${
                  isRiscadorMode
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                R
              </kbd>
            </button>

            {/* Flag / Review button */}
            <button
              onClick={toggleFlag}
              className={`p-2 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                flaggedQuestions[currentQuestion.id]
                  ? 'border-amber-400 bg-amber-50 text-amber-800'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
              title="Marcar questão para revisão"
            >
              <Flag className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Dúvida</span>
            </button>

            {/* Finish button */}
            <button
              onClick={handleFinish}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Finalizar Prova
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span>Respondidas: {answeredCount} de {questions.length}</span>
            <span>{progressPercent}% concluído</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Selector Quick Grid */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-3 mt-3 border-t border-slate-100">
          {questions.map((q, idx) => {
            const isAnswered = !!selectedAnswers[q.id];
            const isFlagged = !!flaggedQuestions[q.id];
            const isCurrent = idx === currentIndex;
            let btnClass = 'bg-slate-100 text-slate-600 border-slate-200';

            if (isCurrent) {
              btnClass = 'bg-sky-600 text-white font-bold ring-2 ring-sky-300 border-sky-600';
            } else if (isAnswered) {
              btnClass = 'bg-emerald-100 text-emerald-800 font-medium border-emerald-300';
            } else if (isFlagged) {
              btnClass = 'bg-amber-100 text-amber-800 font-medium border-amber-300';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-7 h-7 rounded-lg text-xs border flex items-center justify-center shrink-0 transition-all cursor-pointer ${btnClass}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6">
        {/* Subject & Topic Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            {currentQuestion.subjectName}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            {currentQuestion.topicName}
          </span>
          {currentQuestion.focusDistractors && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
              <Target className="w-3 h-3 text-indigo-600" />
              Foco em Distratores FGV
            </span>
          )}
          {currentQuestion.isAiGenerated && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
              <Sparkles className="w-3 h-3 text-sky-600" />
              Inédita FGV (IA)
            </span>
          )}
          <span className="text-xs text-slate-400 ml-auto">
            {currentQuestion.format === 'certo_errado' ? 'Item Certo/Errado' : 'Múltipla Escolha (5 alternativas)'}
          </span>
        </div>

        {/* Alerta de Gargalo de Tempo (> 3 minutos) */}
        {isBottleneck && (
          <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-2.5 text-xs text-amber-900 font-medium">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Alerta de Ritmo FGV (Gargalo de Tempo):</span> Você já consumiu {formatTime(currentQuestionTime)} nesta questão. Em provas da FGV com enunciados extensos, ultrapassar 3 minutos por questão costuma comprometer a resolução das demais e a transcrição do cartão-resposta.
            </div>
          </div>
        )}

        {/* Modo Riscador Banner Informativo quando ativo */}
        {isRiscadorMode && (
          <div className="mb-4 py-2 px-3 rounded-lg bg-amber-100/80 border border-amber-300 text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Strikethrough className="w-4 h-4 text-amber-700" />
              <span><strong>Modo Riscador Ativo:</strong> Clique em qualquer alternativa ou tecle a letra correspondente para riscar/desriscar.</span>
            </div>
            <button
              onClick={() => setIsRiscadorMode(false)}
              className="text-[11px] underline text-amber-800 hover:text-amber-950 font-bold"
            >
              Desativar (R)
            </button>
          </div>
        )}

        {/* Statement (Enunciado) */}
        <div className="prose prose-slate max-w-none mb-6">
          <p className="text-base sm:text-lg text-slate-900 font-normal leading-relaxed whitespace-pre-line">
            {currentQuestion.statement}
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = currentSelectedOption === option.id;
            const isCrossed = (eliminatedOptions[currentQuestion.id] || []).includes(option.id);
            const isCorrect = option.id === currentQuestion.correctOptionId;

            // In Treino mode, show validation colors after confirmation
            let optionStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

            if (isTreino && isCurrentConfirmed) {
              if (isCorrect) {
                optionStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-medium ring-1 ring-emerald-500';
              } else if (isSelected && !isCorrect) {
                optionStyle = 'border-rose-500 bg-rose-50/80 text-rose-950 ring-1 ring-rose-500';
              } else {
                optionStyle = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-70';
              }
            } else if (isSelected) {
              optionStyle = 'border-sky-600 bg-sky-50 text-sky-950 ring-2 ring-sky-500/20 font-medium';
            }

            return (
              <div
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={`relative group p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${optionStyle} ${
                  isCrossed ? 'opacity-40 line-through bg-slate-50' : ''
                } ${isRiscadorMode ? 'hover:ring-2 hover:ring-amber-400' : ''}`}
              >
                {/* Option Identifier Badge (A, B, C, D, E or C, E) */}
                <div
                  className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                    isTreino && isCurrentConfirmed && isCorrect
                      ? 'bg-emerald-600 text-white'
                      : isTreino && isCurrentConfirmed && isSelected && !isCorrect
                      ? 'bg-rose-600 text-white'
                      : isSelected
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                  }`}
                >
                  {isTreino && isCurrentConfirmed ? (
                    isCorrect ? (
                      <Check className="w-4 h-4" />
                    ) : isSelected ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      option.id
                    )
                  ) : (
                    option.id
                  )}
                </div>

                {/* Option Text */}
                <div className="flex-1 text-sm sm:text-base leading-relaxed pt-0.5">
                  {option.text}
                </div>

                {/* Strikethrough Distractor button */}
                {(!isTreino || !isCurrentConfirmed) && (
                  <button
                    type="button"
                    onClick={(e) => handleToggleEliminate(e, option.id)}
                    className={`p-1.5 rounded-lg transition-all ${
                      isCrossed
                        ? 'opacity-100 text-amber-700 bg-amber-100 hover:bg-amber-200'
                        : 'opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60'
                    }`}
                    title={isCrossed ? 'Desfazer risco da alternativa' : 'Riscar alternativa (Atalho: R)'}
                  >
                    <Strikethrough className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Anterior
            </button>

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIndex === questions.length - 1}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
            >
              Próxima
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* In Treino Mode: Confirm Answer button */}
          {isTreino && !isCurrentConfirmed && (
            <button
              onClick={handleConfirmAnswer}
              disabled={!currentSelectedOption}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Confirmar Resposta & Ver Gabarito
            </button>
          )}

          {isTreino && isCurrentConfirmed && (
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 font-semibold text-xs border border-sky-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              Tirar Dúvida com IA Gemini
            </button>
          )}
        </div>

        {/* Barra de Atalhos de Teclado */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 text-slate-600 font-semibold">
              <Keyboard className="w-3.5 h-3.5 text-slate-400" />
              Atalhos de Prova:
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono font-bold text-slate-700 text-[10px]">A-E</kbd>
              <span>Selecionar</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono font-bold text-slate-700 text-[10px]">Espaço</kbd>
              <span>ou</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono font-bold text-slate-700 text-[10px]">→</kbd>
              <span>{isTreino && !isCurrentConfirmed && currentSelectedOption ? 'Confirmar' : 'Avançar'}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono font-bold text-slate-700 text-[10px]">←</kbd>
              <span>Voltar</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono font-bold text-slate-700 text-[10px]">R</kbd>
              <span>Riscador ({isRiscadorMode ? 'Ativo' : 'Inativo'})</span>
            </span>
          </div>

          <div className="text-[10px] text-slate-400 font-medium">
            Velocidade de resolução profissional FGV
          </div>
        </div>
      </div>

      {/* GABARITO COMENTADO CARD (Modo Treino) */}
      {isTreino && isCurrentConfirmed && (
        <div
          className={`rounded-2xl p-6 sm:p-8 border shadow-sm transition-all mb-8 ${
            currentSelectedOption === currentQuestion.correctOptionId
              ? 'bg-emerald-50/50 border-emerald-200'
              : 'bg-rose-50/40 border-rose-200'
          }`}
        >
          {/* Header of Commentary */}
          <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-200/60">
            <div className="flex items-center gap-3">
              {currentSelectedOption === currentQuestion.correctOptionId ? (
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <XCircle className="w-6 h-6 stroke-[2.5]" />
                </div>
              )}
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {currentSelectedOption === currentQuestion.correctOptionId
                    ? 'Resposta Correta! Parabéns!'
                    : 'Resposta Incorreta.'}
                </h4>
                <p className="text-xs text-slate-600">
                  Gabarito Oficial:{' '}
                  <strong className="text-emerald-700 font-extrabold text-sm">
                    Alternativa {currentQuestion.correctOptionId}
                  </strong>{' '}
                  {currentSelectedOption && currentSelectedOption !== currentQuestion.correctOptionId && (
                    <span className="text-rose-700 font-medium">
                      (você marcou {currentSelectedOption})
                    </span>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAiModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              Explicar com Mentor IA
            </button>
          </div>

          {/* CITAÇÃO DO EDITAL */}
          <div className="mb-4 bg-white/80 p-3.5 rounded-xl border border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
              Citação do Tópico do Edital Oficial:
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              {currentQuestion.syllabusCitation}
            </p>
          </div>

          {/* JUSTIFICATIVA FUNDAMENTADA */}
          <div className="mb-4">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Justificativa Fundamentada:
            </span>
            <div className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-white/90 p-4 rounded-xl border border-slate-200 whitespace-pre-line">
              {currentQuestion.justification}
            </div>
          </div>

          {/* DISTRACTORS EXPLANATION (Análise das alternativas incorretas) */}
          {currentQuestion.distractorExplanations && Object.keys(currentQuestion.distractorExplanations).length > 0 && (
            <div className="mt-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Análise dos Distratores (Por que as outras alternativas estão incorretas):
              </span>
              <div className="space-y-2">
                {Object.entries(currentQuestion.distractorExplanations).map(([optId, exp]) => (
                  <div key={optId} className="text-xs bg-white/70 p-3 rounded-lg border border-slate-200 flex items-start gap-2">
                    <span className="font-bold text-slate-800 shrink-0 px-1.5 py-0.5 rounded bg-slate-100">
                      {optId}:
                    </span>
                    <span className="text-slate-700 leading-relaxed">{exp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI Tutor Modal */}
      <AiTutorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        question={currentQuestion}
        userAnswer={currentSelectedOption}
      />
    </div>
  );
};
