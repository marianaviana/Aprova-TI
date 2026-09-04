import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  ListFilter,
  Layers,
  GraduationCap,
  Clock,
  Settings2,
  HelpCircle,
  Building,
  Briefcase,
  Sliders,
  ShieldCheck,
  Target,
  AlertTriangle,
  Search,
  RotateCcw,
  CheckSquare,
  Flame,
} from 'lucide-react';
import { ExamId, QuestionFormat, SimuladoMode } from '../types';
import { EXAMS_INFO, SYLLABUS_DATA } from '../data/syllabusData';

interface SimuladoSetupProps {
  selectedExamId: ExamId;
  onSelectExamId: (id: ExamId) => void;
  onStartSimulado: (config: {
    examId: ExamId;
    profileId?: string;
    selectedSubjectIds: string[];
    format: QuestionFormat;
    mode: SimuladoMode;
    count: number;
    useAi: boolean;
    difficulty: 'Médio' | 'Difícil';
    focusDistractors: boolean;
  }) => void;
  isLoadingAi: boolean;
}

export const SimuladoSetup: React.FC<SimuladoSetupProps> = ({
  selectedExamId,
  onSelectExamId,
  onStartSimulado,
  isLoadingAi,
}) => {
  const currentExam = EXAMS_INFO[selectedExamId];

  // State
  const [selectedProfileId, setSelectedProfileId] = useState<string>(
    currentExam.profiles ? currentExam.profiles[0].id : ''
  );
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]); // empty = all
  const [subjectSearch, setSubjectSearch] = useState('');
  const [format, setFormat] = useState<QuestionFormat>('multipla_escolha');
  const [mode, setMode] = useState<SimuladoMode>('treino');
  const [count, setCount] = useState<number>(5);
  const [useAi, setUseAi] = useState<boolean>(true);
  const [difficulty, setDifficulty] = useState<'Médio' | 'Difícil'>('Difícil');
  const [focusDistractors, setFocusDistractors] = useState<boolean>(true);

  // Sincroniza o perfil quando o concurso muda
  React.useEffect(() => {
    if (currentExam.profiles && currentExam.profiles.length > 0) {
      setSelectedProfileId(currentExam.profiles[0].id);
    } else {
      setSelectedProfileId('');
    }
    setSelectedSubjectIds([]);
  }, [selectedExamId]);

  // Filter available subjects according to exam & profile & search query
  const availableSubjects = SYLLABUS_DATA.filter((s) => {
    if (s.examId !== selectedExamId) return false;
    if (s.profileId && selectedProfileId && s.profileId !== selectedProfileId) {
      return false;
    }
    if (subjectSearch.trim()) {
      const q = subjectSearch.toLowerCase();
      const matchName = s.name.toLowerCase().includes(q);
      const matchTopics = s.topics.some((t) => t.name.toLowerCase().includes(q));
      if (!matchName && !matchTopics) return false;
    }
    return true;
  });

  const toggleSubject = (subjectId: string) => {
    if (selectedSubjectIds.includes(subjectId)) {
      setSelectedSubjectIds(selectedSubjectIds.filter((id) => id !== subjectId));
    } else {
      setSelectedSubjectIds([...selectedSubjectIds, subjectId]);
    }
  };

  const selectAllSubjects = () => {
    setSelectedSubjectIds([]);
  };

  const selectAllSpecificSubjects = () => {
    setSelectedSubjectIds(availableSubjects.map((s) => s.id));
  };

  const applyPreset = (presetType: 'expresso' | 'padrao' | 'prova_real' | 'pegadinhas') => {
    if (presetType === 'expresso') {
      setCount(5);
      setUseAi(false);
      setMode('treino');
      setFocusDistractors(false);
    } else if (presetType === 'padrao') {
      setCount(10);
      setUseAi(true);
      setMode('treino');
      setFocusDistractors(true);
      setFormat('multipla_escolha');
    } else if (presetType === 'prova_real') {
      setCount(20);
      setMode('prova');
      setUseAi(true);
      setFocusDistractors(true);
      setFormat('multipla_escolha');
    } else if (presetType === 'pegadinhas') {
      setCount(10);
      setMode('treino');
      setFocusDistractors(true);
      setDifficulty('Difícil');
      setUseAi(true);
    }
  };

  const handleStart = () => {
    onStartSimulado({
      examId: selectedExamId,
      profileId: currentExam.profiles && currentExam.profiles.length > 0 ? selectedProfileId : undefined,
      selectedSubjectIds: selectedSubjectIds.length > 0 ? selectedSubjectIds : ['all'],
      format,
      mode,
      count,
      useAi,
      difficulty,
      focusDistractors,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 mb-3 border border-sky-200">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          Inteligência Artificial & Banco Oficial de Editais TI
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Configurar Simulado de TI
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Treine com questões inéditas e comentadas alinhadas ao estilo das bancas{' '}
          <strong className="text-slate-900 font-semibold">FGV, Cesgranrio e FCC</strong>, com foco exclusivo no conteúdo programático de Tecnologia da Informação.
        </p>
      </div>

      {/* Quick Presets Bar */}
      <div className="bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 border border-sky-200/80 rounded-2xl p-4 mb-6 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
            <Flame className="w-4 h-4 text-amber-500" />
            Atalhos de Simulado Rápido:
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Clique para carregar uma configuração otimizada
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => applyPreset('expresso')}
            className="px-3 py-2 rounded-xl bg-white hover:bg-sky-100/60 border border-slate-200 hover:border-sky-300 text-left transition-all shadow-2xs group"
          >
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <span>⚡ Expresso (5Q)</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Banco offline instantâneo</div>
          </button>

          <button
            type="button"
            onClick={() => applyPreset('padrao')}
            className="px-3 py-2 rounded-xl bg-white hover:bg-indigo-100/60 border border-slate-200 hover:border-indigo-300 text-left transition-all shadow-2xs group"
          >
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <span>🎯 Padrão FGV (10Q)</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Treino com distratores</div>
          </button>

          <button
            type="button"
            onClick={() => applyPreset('prova_real')}
            className="px-3 py-2 rounded-xl bg-white hover:bg-purple-100/60 border border-slate-200 hover:border-purple-300 text-left transition-all shadow-2xs group"
          >
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <span>🏆 Prova Real (20Q)</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Timer e gabarito final</div>
          </button>

          <button
            type="button"
            onClick={() => applyPreset('pegadinhas')}
            className="px-3 py-2 rounded-xl bg-white hover:bg-amber-100/60 border border-slate-200 hover:border-amber-300 text-left transition-all shadow-2xs group"
          >
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <span>🧠 Pegadinhas FGV</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Nível difícil com armadilhas</div>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* 1. SELEÇÃO DE BANCA / EDITAL */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Building className="w-5 h-5 text-sky-600" />
            <h2 className="text-base font-bold text-slate-900">
              1. Seleção de Banca e Edital
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card SEPLAG */}
            <div
              onClick={() => onSelectExamId('seplag')}
              className={`cursor-pointer rounded-xl p-4 border-2 transition-all text-left ${
                selectedExamId === 'seplag'
                  ? 'border-sky-600 bg-sky-50/60 shadow-xs ring-2 ring-sky-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide bg-sky-100 text-sky-800">
                    Banca FGV • 2026
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">SEPLAG-RJ</h3>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">
                    Analista de Planejamento e Orçamento (APO) - TI
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    selectedExamId === 'seplag'
                      ? 'border-sky-600 bg-sky-600 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {selectedExamId === 'seplag' && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span>Governança TIC + Inteligência Analítica</span>
                <span className="font-semibold text-sky-700">100 questões</span>
              </div>
            </div>

            {/* Card DATAPREV */}
            <div
              onClick={() => onSelectExamId('dataprev')}
              className={`cursor-pointer rounded-xl p-4 border-2 transition-all text-left ${
                selectedExamId === 'dataprev'
                  ? 'border-indigo-600 bg-indigo-50/60 shadow-xs ring-2 ring-indigo-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide bg-indigo-100 text-indigo-800">
                    Banca FGV • Edital 2026
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">DATAPREV</h3>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">
                    Analista de Tecnologia da Informação (Perfis 1 a 6)
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    selectedExamId === 'dataprev'
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {selectedExamId === 'dataprev' && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span>Engenharia, Dev, Segurança, BI e Nuvem</span>
                <span className="font-semibold text-indigo-700">Peso 2,5 em Específicos</span>
              </div>
            </div>

            {/* Card TRANSPETRO */}
            <div
              onClick={() => onSelectExamId('transpetro')}
              className={`cursor-pointer rounded-xl p-4 border-2 transition-all text-left ${
                selectedExamId === 'transpetro'
                  ? 'border-amber-600 bg-amber-50/60 shadow-xs ring-2 ring-amber-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide bg-amber-100 text-amber-800">
                    Banca Cesgranrio • Edital 2026.4
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">TRANSPETRO</h3>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">
                    Profissional Transpetro Nível Superior - TI
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    selectedExamId === 'transpetro'
                      ? 'border-amber-600 bg-amber-600 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {selectedExamId === 'transpetro' && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span>Infra, Segurança, Dados, Processos e SAP</span>
                <span className="font-semibold text-amber-700">50Q Específicas de TI</span>
              </div>
            </div>

            {/* Card ABGF */}
            <div
              onClick={() => onSelectExamId('abgf')}
              className={`cursor-pointer rounded-xl p-4 border-2 transition-all text-left ${
                selectedExamId === 'abgf'
                  ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-2 ring-emerald-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide bg-emerald-100 text-emerald-800">
                    Banca FCC • Edital 01/2026
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">ABGF</h3>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">
                    Analista de TI (Cargo E05 - Nível Superior)
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    selectedExamId === 'abgf'
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {selectedExamId === 'abgf' && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span>DevOps, Cibersegurança, Dados e Redes</span>
                <span className="font-semibold text-emerald-700">Peso 3 em TI</span>
              </div>
            </div>
          </div>

          {/* Profile Selector for Exams that have profiles (DATAPREV, TRANSPETRO, ABGF) */}
          {currentExam.profiles && currentExam.profiles.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-sky-600" />
                Selecione o Perfil / Ênfase de TI ({currentExam.shortName} • {currentExam.banca}):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {currentExam.profiles.map((profile) => (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => {
                      setSelectedProfileId(profile.id);
                      setSelectedSubjectIds([]);
                    }}
                    className={`text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                      selectedProfileId === profile.id
                        ? 'border-sky-600 bg-sky-50/90 text-sky-950 font-semibold shadow-xs ring-1 ring-sky-500/30'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div className="font-medium text-slate-900">{profile.name}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {profile.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2. FILTRO POR MATÉRIA */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <ListFilter className="w-5 h-5 text-sky-600 shrink-0" />
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  2. Filtro por Matéria / Disciplina
                </h2>
                <p className="text-xs text-slate-500">
                  Escolha disciplinas específicas ou pratique o simulado geral completo
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={selectAllSubjects}
                className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${
                  selectedSubjectIds.length === 0
                    ? 'bg-sky-600 text-white font-medium shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Geral (Todas)
              </button>
              <button
                type="button"
                onClick={selectAllSpecificSubjects}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                title="Marcar todas as opções"
              >
                Marcar Todas
              </button>
            </div>
          </div>

          {/* Subject Search Bar */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={subjectSearch}
              onChange={(e) => setSubjectSearch(e.target.value)}
              placeholder="Buscar por matéria ou tópico (ex: Governança, Java, LGPD, Nuvem)..."
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-500 focus:bg-white text-slate-800 placeholder:text-slate-400"
            />
            {subjectSearch && (
              <button
                onClick={() => setSubjectSearch('')}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto p-0.5">
            {availableSubjects.map((subject) => {
              const isSelected = selectedSubjectIds.includes(subject.id);
              return (
                <div
                  key={subject.id}
                  onClick={() => toggleSubject(subject.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'border-sky-600 bg-sky-50/60 ring-1 ring-sky-500'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold ${
                          isSelected ? 'text-sky-900' : 'text-slate-800'
                        }`}
                      >
                        {subject.name}
                      </span>
                      {subject.isSpecificKnowledge && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[10px] font-semibold">
                          Específica
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {subject.topics.map((t) => t.name).join(' • ')}
                    </p>
                  </div>
                  <div
                    className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'border-sky-600 bg-sky-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
              );
            })}
          </div>

          {selectedSubjectIds.length > 0 && (
            <div className="mt-3 flex items-center justify-between text-xs text-sky-700 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100">
              <span>✓ Filtro ativo: simulado focado em {selectedSubjectIds.length} matéria(s) selecionada(s).</span>
              <button
                onClick={selectAllSubjects}
                className="text-sky-800 underline hover:text-sky-950 font-semibold"
              >
                Limpar filtro
              </button>
            </div>
          )}
        </div>

        {/* 3. FORMATO, MODO E CONFIGURAÇÕES */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-sky-600" />
            <h2 className="text-base font-bold text-slate-900">
              3. Parâmetros e Modo de Simulado
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Formato de Questão */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Formato das Questões
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormat('multipla_escolha')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    format === 'multipla_escolha'
                      ? 'border-sky-600 bg-sky-50/70 text-sky-950 ring-1 ring-sky-500 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs">Múltipla Escolha</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    5 Alternativas (A-E) Padrão FGV
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat('certo_errado')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    format === 'certo_errado'
                      ? 'border-sky-600 bg-sky-50/70 text-sky-950 ring-1 ring-sky-500 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs">Certo ou Errado</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Julgamento rápido de assertivas técnicas
                  </div>
                </button>
              </div>
            </div>

            {/* Modo de Simulado */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Modo de Resolução
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMode('treino')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    mode === 'treino'
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-500 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                    Modo Treino
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Gabarito e fundamentação imediata
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('prova')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    mode === 'prova'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-1 ring-indigo-500 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    Modo Prova Real
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Cronômetro total e resultado final
                  </div>
                </button>
              </div>
            </div>

            {/* Quantidade de Questões */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Quantidade de Questões
              </label>
              <div className="flex gap-2">
                {[5, 10, 15, 20].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setCount(num)}
                    className={`flex-1 py-2.5 rounded-xl border font-bold text-xs transition-all ${
                      count === num
                        ? 'border-sky-600 bg-sky-600 text-white shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    {num}Q
                  </button>
                ))}
              </div>
            </div>

            {/* Gerador: IA Gemini vs Banco Curado */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Motor de Geração</span>
                <span className="text-[11px] text-sky-700 font-normal">
                  {useAi ? 'IA Gemini Ativa' : 'Banco Curado Offline'}
                </span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUseAi(true)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    useAi
                      ? 'border-sky-600 bg-sky-50 text-sky-950 font-semibold ring-1 ring-sky-500'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    <span>Inéditas via IA</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Gera novas questões com IA Gemini
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setUseAi(false)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    !useAi
                      ? 'border-slate-700 bg-slate-100 text-slate-900 font-semibold ring-1 ring-slate-400'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs flex items-center gap-1.5 font-bold">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Banco Curado</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Carregamento instantâneo
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Filtro Especial: Modo Foco em Distratores FGV */}
          <div className="pt-2 border-t border-slate-100">
            <div
              onClick={() => setFocusDistractors(!focusDistractors)}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start justify-between gap-4 ${
                focusDistractors
                  ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-1 ring-indigo-500/30'
                  : 'border-slate-200 bg-slate-50/60 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    focusDistractors
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      Modo Foco em Distratores FGV
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                        focusDistractors
                          ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {focusDistractors ? 'Ativado • Padrão FGV' : 'Desativado'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Instrui a elaboração a forçar as armadilhas clássicas da FGV: troca sutil de conceitos em normas e frameworks (ex.: Governança vs Gestão no COBIT 2019, Práticas no ITIL 4, atribuições na LGPD e DMBOK), termos "quase certos" e alternativas extensas com alta densidade técnica.
                  </p>
                </div>
              </div>

              {/* Switch Toggle */}
              <div className="pt-1 shrink-0">
                <div
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    focusDistractors ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform duration-200 ${
                      focusDistractors ? 'left-5.5' : 'left-0.5'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button & Configuration Summary */}
        <div className="pt-2">
          {/* Summary Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3 text-xs text-slate-600">
            <span className="px-2.5 py-1 rounded-full bg-slate-100 font-medium">
              🏛️ {currentExam.shortName}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 font-medium">
              📝 {count} Questões ({format === 'multipla_escolha' ? 'Múltipla Escolha' : 'Certo/Errado'})
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 font-medium">
              ⏱️ {mode === 'treino' ? 'Modo Treino (Instantâneo)' : 'Modo Prova (Com Timer)'}
            </span>
            {focusDistractors && (
              <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 font-semibold">
                🎯 Distratores FGV Ativos
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={isLoadingAi}
            onClick={handleStart}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-60 cursor-pointer"
          >
            {isLoadingAi ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Examinador FGV (IA) elaborando simulado inédito...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Iniciar Simulado Agora ({count} Questões • {format === 'multipla_escolha' ? 'Múltipla Escolha' : 'Certo/Errado'})</span>
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-400 mt-2">
            Baseado no Conteúdo Programático Oficial dos Editais SEPLAG-RJ e DATAPREV (Banca FGV).
          </p>
        </div>
      </div>
    </div>
  );
};
