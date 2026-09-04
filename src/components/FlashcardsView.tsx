import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  RotateCw,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Plus,
  Trash2,
  Search,
  BookOpen,
  Filter,
  Flame,
  Award,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
  Tag,
  ArrowRight,
} from 'lucide-react';
import Markdown from 'react-markdown';
import { Flashcard, FlashcardDifficulty, ExamId } from '../types';

interface FlashcardsViewProps {
  flashcards: Flashcard[];
  onUpdateFlashcard: (updated: Flashcard) => void;
  onDeleteFlashcard: (id: string) => void;
  onOpenCreateModal: () => void;
  onResetDefaultCards: () => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  flashcards,
  onUpdateFlashcard,
  onDeleteFlashcard,
  onOpenCreateModal,
  onResetDefaultCards,
}) => {
  const [viewMode, setViewMode] = useState<'review' | 'list'>('review');
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | FlashcardDifficulty>('all');
  const [selectedSource, setSelectedSource] = useState<'all' | 'mentor' | 'caderno_erros' | 'manual'>('all');
  const [reviewCompleted, setReviewCompleted] = useState<boolean>(false);
  const [reviewedCountThisSession, setReviewedCountThisSession] = useState<number>(0);

  // Filtered list for either study deck or library
  const filteredCards = flashcards.filter((card) => {
    if (selectedDifficulty !== 'all' && card.difficulty !== selectedDifficulty) return false;
    if (selectedSource !== 'all' && card.source !== selectedSource) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchFront = card.front.toLowerCase().includes(q);
      const matchBack = card.back.toLowerCase().includes(q);
      const matchSubject = card.subjectName?.toLowerCase().includes(q) || false;
      const matchTag = card.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchFront && !matchBack && !matchSubject && !matchTag) return false;
    }
    return true;
  });

  const activeCard = filteredCards[currentCardIndex];

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleRateDifficulty = (rating: FlashcardDifficulty) => {
    if (!activeCard) return;

    const updated: Flashcard = {
      ...activeCard,
      difficulty: rating,
      timesReviewed: (activeCard.timesReviewed || 0) + 1,
      lastReviewed: new Date().toISOString(),
    };

    onUpdateFlashcard(updated);
    setReviewedCountThisSession((prev) => prev + 1);

    // Next card
    if (currentCardIndex + 1 < filteredCards.length) {
      setIsFlipped(false);
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      setReviewCompleted(true);
    }
  };

  const handleRestartReview = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setReviewCompleted(false);
  };

  // Stats calculation
  const totalCards = flashcards.length;
  const hardCards = flashcards.filter((c) => c.difficulty === 'dificil').length;
  const mediumCards = flashcards.filter((c) => c.difficulty === 'medio').length;
  const easyCards = flashcards.filter((c) => c.difficulty === 'facil').length;
  const newCards = flashcards.filter((c) => c.difficulty === 'novo').length;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 mb-2 border border-indigo-200">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            Repetição Espaçada & Memorização Ativa
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Flashcards de TI
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Fixação acelerada de normas (COBIT, ITIL, ISO, DMBOK, NIST), legislações e pegadinhas de banca
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCreateModal}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Flashcard</span>
          </button>

          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setViewMode('review');
                handleRestartReview();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'review'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Modo Revisão
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Biblioteca ({totalCards})
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Total Cards
          </span>
          <span className="text-2xl font-black text-slate-900">{totalCards}</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-rose-200 bg-rose-50/40 shadow-xs text-center">
          <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider block">
            Difíceis (Rever)
          </span>
          <span className="text-2xl font-black text-rose-600">{hardCards}</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-amber-200 bg-amber-50/40 shadow-xs text-center">
          <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block">
            Médios
          </span>
          <span className="text-2xl font-black text-amber-600">{mediumCards}</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/40 shadow-xs text-center">
          <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
            Dominados (Fácil)
          </span>
          <span className="text-2xl font-black text-emerald-600">{easyCards}</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-sky-200 bg-sky-50/40 shadow-xs text-center col-span-2 sm:col-span-1">
          <span className="text-[11px] font-semibold text-sky-700 uppercase tracking-wider block">
            Novos / Não Lidos
          </span>
          <span className="text-2xl font-black text-sky-600">{newCards}</span>
        </div>
      </div>

      {/* VIEW MODE 1: REVISÃO ATIVA (FLIP CARD) */}
      {viewMode === 'review' && (
        <div>
          {/* Deck Filters for Practice */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
              <span className="text-slate-500 font-semibold mr-1">Filtrar Deck:</span>
              <button
                onClick={() => {
                  setSelectedDifficulty('all');
                  handleRestartReview();
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedDifficulty === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Todos ({totalCards})
              </button>
              <button
                onClick={() => {
                  setSelectedDifficulty('dificil');
                  handleRestartReview();
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedDifficulty === 'dificil'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                Difíceis ({hardCards})
              </button>
              <button
                onClick={() => {
                  setSelectedDifficulty('novo');
                  handleRestartReview();
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedDifficulty === 'novo'
                    ? 'bg-sky-600 text-white'
                    : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                }`}
              >
                Novos ({newCards})
              </button>
            </div>

            {filteredCards.length > 0 && !reviewCompleted && (
              <span className="text-xs font-bold text-slate-500">
                Card {currentCardIndex + 1} de {filteredCards.length}
              </span>
            )}
          </div>

          {/* Review Finished Screen */}
          {reviewCompleted || filteredCards.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200 shadow-md">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                {filteredCards.length === 0
                  ? 'Nenhum flashcard neste filtro!'
                  : 'Sessão de Revisão Concluída!'}
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto mt-2">
                {filteredCards.length === 0
                  ? 'Você não possui cards com o filtro selecionado. Mude o filtro ou crie novos cards a partir das respostas do Mentor IA e Caderno de Erros.'
                  : `Você revisou ${reviewedCountThisSession} cards nesta rodada de estudo. A repetição diária consolida os conceitos na memória de longo prazo.`}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {filteredCards.length > 0 && (
                  <button
                    type="button"
                    onClick={handleRestartReview}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Revisar Novamente Este Deck
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setSelectedDifficulty('all');
                    handleRestartReview();
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Ver Todos os Cards
                </button>

                <button
                  type="button"
                  onClick={onOpenCreateModal}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Criar Novo Card
                </button>
              </div>
            </div>
          ) : (
            /* THE FLASHCARD DISPLAY */
            <div className="space-y-4">
              {/* Progress bar */}
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                  style={{
                    width: `${Math.round(((currentCardIndex + 1) / filteredCards.length) * 100)}%`,
                  }}
                />
              </div>

              {/* CARD CONTAINER */}
              <div
                onClick={handleFlip}
                className={`relative min-h-[320px] sm:min-h-[360px] bg-white rounded-3xl p-6 sm:p-8 border-2 transition-all cursor-pointer flex flex-col justify-between shadow-md hover:shadow-lg ${
                  isFlipped
                    ? 'border-indigo-400/80 bg-gradient-to-b from-white to-indigo-50/30'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Card Top Metadata */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                          isFlipped
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {isFlipped ? 'VERSO • RESPOSTA' : 'FRENTE • CONCEITO'}
                      </span>

                      {activeCard.subjectName && (
                        <span className="text-xs font-semibold text-slate-700">
                          {activeCard.subjectName}
                        </span>
                      )}

                      {activeCard.source === 'mentor' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-sky-600" /> Mentor IA
                        </span>
                      )}
                      {activeCard.source === 'caderno_erros' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                          Caderno de Erros
                        </span>
                      )}
                    </div>

                    {/* Current Rating Badge */}
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        activeCard.difficulty === 'facil'
                          ? 'bg-emerald-100 text-emerald-800'
                          : activeCard.difficulty === 'medio'
                          ? 'bg-amber-100 text-amber-800'
                          : activeCard.difficulty === 'dificil'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Status: {activeCard.difficulty === 'novo' ? 'Novo' : activeCard.difficulty}
                    </span>
                  </div>

                  {/* Main Card Body */}
                  <div className="my-auto py-4">
                    {!isFlipped ? (
                      /* FRONT */
                      <div className="space-y-3">
                        <p className="text-lg sm:text-2xl font-bold text-slate-900 leading-snug">
                          {activeCard.front}
                        </p>
                      </div>
                    ) : (
                      /* BACK (Markdwon enabled) */
                      <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-800">
                        <div className="markdown-body">
                          <Markdown>{activeCard.back}</Markdown>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer / Tags & Click hint */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {activeCard.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-indigo-600 font-semibold text-xs">
                    <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                    <span>Clique para {isFlipped ? 'ver pergunta' : 'revelar resposta'}</span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              {!isFlipped ? (
                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={handleFlip}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    Revelar Resposta (Ver Verso)
                  </button>
                </div>
              ) : (
                /* 3 DIFFICULTY EVALUATION BUTTONS */
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                    Como foi a sua recordação deste conceito?
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-1">
                    {/* Difícil */}
                    <button
                      type="button"
                      onClick={() => handleRateDifficulty('dificil')}
                      className="p-3 sm:p-4 rounded-xl border-2 border-rose-300 bg-rose-50/80 hover:bg-rose-100 text-rose-900 transition-all text-center cursor-pointer group"
                    >
                      <div className="text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                        Difícil
                      </div>
                      <div className="text-[10px] sm:text-xs text-rose-700 mt-1 opacity-90">
                        Não lembrava / Errei
                      </div>
                    </button>

                    {/* Médio */}
                    <button
                      type="button"
                      onClick={() => handleRateDifficulty('medio')}
                      className="p-3 sm:p-4 rounded-xl border-2 border-amber-300 bg-amber-50/80 hover:bg-amber-100 text-amber-900 transition-all text-center cursor-pointer group"
                    >
                      <div className="text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                        Médio
                      </div>
                      <div className="text-[10px] sm:text-xs text-amber-700 mt-1 opacity-90">
                        Lembrei com esforço
                      </div>
                    </button>

                    {/* Fácil */}
                    <button
                      type="button"
                      onClick={() => handleRateDifficulty('facil')}
                      className="p-3 sm:p-4 rounded-xl border-2 border-emerald-300 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-900 transition-all text-center cursor-pointer group"
                    >
                      <div className="text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                        Fácil
                      </div>
                      <div className="text-[10px] sm:text-xs text-emerald-700 mt-1 opacity-90">
                        Dominei o conceito
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: BIBLIOTECA & GERENCIAMENTO */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {/* Search & Filters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por termo, COBIT, ITIL, DMBOK, ISO, tag..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50 focus:bg-white"
              >
                <option value="all">Todas Dificuldades</option>
                <option value="dificil">Difíceis ({hardCards})</option>
                <option value="medio">Médios ({mediumCards})</option>
                <option value="facil">Fáceis ({easyCards})</option>
                <option value="novo">Novos ({newCards})</option>
              </select>

              <button
                type="button"
                onClick={onResetDefaultCards}
                className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold whitespace-nowrap transition-colors"
                title="Recarregar os flashcards oficiais do edital"
              >
                Restaurar Padrões
              </button>
            </div>
          </div>

          {/* Cards List */}
          {filteredCards.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs">
              <p className="text-sm font-semibold text-slate-700">Nenhum flashcard encontrado.</p>
              <p className="text-xs text-slate-500 mt-1">
                Tente alterar a busca ou clique em "+ Novo Flashcard" para adicionar.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCards.map((card, index) => (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      {card.subjectName && (
                        <span className="text-xs font-bold text-slate-800">
                          {card.subjectName}
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          card.difficulty === 'facil'
                            ? 'bg-emerald-100 text-emerald-800'
                            : card.difficulty === 'medio'
                            ? 'bg-amber-100 text-amber-800'
                            : card.difficulty === 'dificil'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {card.difficulty}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDeleteFlashcard(card.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Excluir flashcard"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Question and Answer preview */}
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Frente:
                    </div>
                    <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                      {card.front}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Verso (Gabarito / Fundamentação):
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl">
                      <Markdown>{card.back}</Markdown>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-slate-400 text-xs">
                    {card.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                    <span className="ml-auto text-[11px]">
                      Revisado {card.timesReviewed || 0}x
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
