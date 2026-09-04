import React from 'react';
import { BookOpen, BarChart3, BookmarkCheck, FileText, Sparkles, Building2, Bot } from 'lucide-react';
import { ExamId } from '../types';
import { EXAMS_INFO } from '../data/syllabusData';

interface NavbarProps {
  currentTab: 'simulado' | 'dashboard' | 'erros' | 'edital' | 'mentor';
  onSelectTab: (tab: 'simulado' | 'dashboard' | 'erros' | 'edital' | 'mentor') => void;
  selectedExamId: ExamId;
  onSelectExamId: (examId: ExamId) => void;
  savedErrorsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  selectedExamId,
  onSelectExamId,
  savedErrorsCount,
}) => {
  const currentExam = EXAMS_INFO[selectedExamId];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-sm font-bold text-lg">
              TI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 tracking-tight text-lg">
                  Simulados TI
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  Editais FGV 2026
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Preparação estratégica para SEPLAG-RJ & DATAPREV
              </p>
            </div>
          </div>

          {/* Exam Selector Switcher */}
          <div className="hidden xl:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onSelectExamId('seplag')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedExamId === 'seplag'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="SEPLAG-RJ (APO TI) - Banca FGV"
            >
              <Building2 className="w-3.5 h-3.5 text-sky-600" />
              <span>SEPLAG-RJ</span>
              <span className="px-1 py-0.2 rounded bg-sky-50 text-sky-700 font-mono text-[9px]">
                FGV
              </span>
            </button>

            <button
              onClick={() => onSelectExamId('dataprev')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedExamId === 'dataprev'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="DATAPREV (Analista TI) - Banca FGV"
            >
              <Building2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>DATAPREV</span>
              <span className="px-1 py-0.2 rounded bg-indigo-50 text-indigo-700 font-mono text-[9px]">
                FGV
              </span>
            </button>

            <button
              onClick={() => onSelectExamId('transpetro')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedExamId === 'transpetro'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="TRANSPETRO (Profissional Nível Superior TI) - Banca Fundação Cesgranrio"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-600" />
              <span>TRANSPETRO</span>
              <span className="px-1 py-0.2 rounded bg-amber-50 text-amber-700 font-mono text-[9px]">
                Cesgranrio
              </span>
            </button>

            <button
              onClick={() => onSelectExamId('abgf')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedExamId === 'abgf'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="ABGF (Analista TI E05) - Banca Fundação Carlos Chagas (FCC)"
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>ABGF</span>
              <span className="px-1 py-0.2 rounded bg-emerald-50 text-emerald-700 font-mono text-[9px]">
                FCC
              </span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onSelectTab('simulado')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                currentTab === 'simulado'
                  ? 'bg-sky-50 text-sky-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>Simulado</span>
            </button>

            <button
              onClick={() => onSelectTab('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                currentTab === 'dashboard'
                  ? 'bg-sky-50 text-sky-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Desempenho</span>
              <span className="sm:hidden">Stats</span>
            </button>

            <button
              onClick={() => onSelectTab('erros')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors relative ${
                currentTab === 'erros'
                  ? 'bg-rose-50 text-rose-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookmarkCheck className="w-4 h-4 text-rose-600" />
              <span className="hidden sm:inline">Caderno de Erros</span>
              <span className="sm:hidden">Erros</span>
              {savedErrorsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                  {savedErrorsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectTab('mentor')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all relative ${
                currentTab === 'mentor'
                  ? 'bg-gradient-to-r from-sky-50 to-indigo-50 text-indigo-700 font-semibold border border-indigo-200/60 shadow-xs'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>Mentor IA</span>
              <span className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700">
                Gemini
              </span>
            </button>

            <button
              onClick={() => onSelectTab('edital')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                currentTab === 'edital'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span className="hidden md:inline">Conteúdo Edital</span>
            </button>
          </nav>
        </div>

        {/* Mobile Exam Quick Switcher */}
        <div className="xl:hidden pb-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold shrink-0">
            Concursos:
          </span>
          <button
            onClick={() => onSelectExamId('seplag')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium shrink-0 transition-colors cursor-pointer ${
              selectedExamId === 'seplag'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            SEPLAG-RJ <span className="text-[10px] opacity-80">(FGV)</span>
          </button>
          <button
            onClick={() => onSelectExamId('dataprev')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium shrink-0 transition-colors cursor-pointer ${
              selectedExamId === 'dataprev'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            DATAPREV <span className="text-[10px] opacity-80">(FGV)</span>
          </button>
          <button
            onClick={() => onSelectExamId('transpetro')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium shrink-0 transition-colors cursor-pointer ${
              selectedExamId === 'transpetro'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            TRANSPETRO <span className="text-[10px] opacity-80">(Cesgranrio)</span>
          </button>
          <button
            onClick={() => onSelectExamId('abgf')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium shrink-0 transition-colors cursor-pointer ${
              selectedExamId === 'abgf'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ABGF <span className="text-[10px] opacity-80">(FCC)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
