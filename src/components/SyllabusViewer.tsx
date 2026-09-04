import React, { useState } from 'react';
import {
  FileText,
  Search,
  CheckCircle,
  Sparkles,
  Layers,
  Building,
  Briefcase,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { ExamId } from '../types';
import { EXAMS_INFO, SYLLABUS_DATA } from '../data/syllabusData';

interface SyllabusViewerProps {
  onStartSubjectSimulado: (subjectId: string, examId: ExamId) => void;
}

export const SyllabusViewer: React.FC<SyllabusViewerProps> = ({
  onStartSubjectSimulado,
}) => {
  const [selectedExam, setSelectedExam] = useState<ExamId>('seplag');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({
    seplag_gov_tic: true,
    dataprev_perfil3_dev: true,
  });

  const toggleSubject = (id: string) => {
    setExpandedSubjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const currentExamInfo = EXAMS_INFO[selectedExam];
  const examSubjects = SYLLABUS_DATA.filter((s) => s.examId === selectedExam);

  const filteredSubjects = examSubjects.filter((subject) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const matchesSubject = subject.name.toLowerCase().includes(term);
    const matchesTopic = subject.topics.some(
      (t) =>
        t.name.toLowerCase().includes(term) ||
        t.subtopics.some((st) => st.toLowerCase().includes(term))
    );
    return matchesSubject || matchesTopic;
  });

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 mb-2 border border-sky-200">
          <FileText className="w-3.5 h-3.5 text-sky-600" />
          Conteúdo Programático Oficial dos Editais
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Estrutura dos Editais & Tópicos de TI
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Extraído integralmente dos editais anexados (SEPLAG-RJ 2026 e DATAPREV Retificado 2026)
        </p>
      </div>

      {/* Exam Switcher Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-full sm:w-auto">
          <button
            onClick={() => setSelectedExam('seplag')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedExam === 'seplag'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-4 h-4 text-sky-600" />
            <span>SEPLAG-RJ (APO TI)</span>
          </button>

          <button
            onClick={() => setSelectedExam('dataprev')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedExam === 'dataprev'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4 text-indigo-600" />
            <span>DATAPREV (Perfis TI)</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filtrar tópicos (ex: COBIT, ITIL, DMBOK, SQL)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
          />
        </div>
      </div>

      {/* Exam Details Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
                Banca {currentExamInfo.banca}
              </span>
              <span className="text-xs text-slate-500 font-medium">Ano 2026</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              {currentExamInfo.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Cargo: <strong>{currentExamInfo.role}</strong>
            </p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-slate-900">
              {currentExamInfo.totalQuestionsEdital} Questões
            </span>
            <p className="text-xs text-slate-500">Mínimo para aprovação: 50%</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl">
          <strong>Regras do Edital: </strong> {currentExamInfo.discursiveInfo}
        </div>
      </div>

      {/* Subjects and Topics Accordion */}
      <div className="space-y-4">
        {filteredSubjects.map((subject) => {
          const isExpanded = expandedSubjects[subject.id] !== false;

          return (
            <div
              key={subject.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
            >
              {/* Subject Bar */}
              <div
                onClick={() => toggleSubject(subject.id)}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-sky-50 text-sky-700">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        {subject.name}
                      </h3>
                      {subject.isSpecificKnowledge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                          Conhecimentos Específicos
                        </span>
                      )}
                      {subject.questionCountEdital && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                          {subject.questionCountEdital} questões no edital
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {subject.topics.length} blocos de conteúdo programático
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartSubjectSimulado(subject.id, selectedExam);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Praticar Esta Matéria</span>
                  </button>

                  <div className="text-slate-400 p-1">
                    {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Subtopics List */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-100 space-y-4">
                  {subject.topics.map((topic) => (
                    <div
                      key={topic.id}
                      className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 space-y-2"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-sky-600" />
                        {topic.name}
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-4">
                        {topic.subtopics.map((st, i) => (
                          <li key={i} className="text-xs text-slate-700 list-disc leading-relaxed">
                            {st}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
