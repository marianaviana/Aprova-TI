import React, { useState, useEffect } from 'react';
import { X, Layers, Sparkles, Tag, Check, BookOpen } from 'lucide-react';
import { Flashcard, FlashcardDifficulty, ExamId } from '../types';

interface CreateFlashcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (card: {
    front: string;
    back: string;
    tags: string[];
    subjectName?: string;
    topicName?: string;
    examId?: ExamId;
    source: 'mentor' | 'caderno_erros' | 'manual' | 'simulado';
    difficulty: FlashcardDifficulty;
  }) => void;
  initialData?: {
    front?: string;
    back?: string;
    tags?: string[];
    subjectName?: string;
    topicName?: string;
    examId?: ExamId;
    source?: 'mentor' | 'caderno_erros' | 'manual' | 'simulado';
  } | null;
}

export const CreateFlashcardModal: React.FC<CreateFlashcardModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [difficulty, setDifficulty] = useState<FlashcardDifficulty>('novo');
  const [source, setSource] = useState<'mentor' | 'caderno_erros' | 'manual' | 'simulado'>('manual');

  useEffect(() => {
    if (isOpen) {
      setFront(initialData?.front || '');
      setBack(initialData?.back || '');
      setTagsInput(initialData?.tags ? initialData.tags.join(', ') : '');
      setSubjectName(initialData?.subjectName || '');
      setSource(initialData?.source || 'manual');
      setDifficulty('novo');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!front.trim() || !back.trim()) return;

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    onSave({
      front: front.trim(),
      back: back.trim(),
      tags: parsedTags.length > 0 ? parsedTags : ['Revisão TI'],
      subjectName: subjectName.trim() || undefined,
      topicName: initialData?.topicName,
      examId: initialData?.examId,
      source,
      difficulty,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {initialData?.source === 'mentor'
                  ? 'Salvar Conceito do Mentor IA como Flashcard'
                  : initialData?.source === 'caderno_erros'
                  ? 'Criar Flashcard a partir do Erro'
                  : 'Novo Flashcard de Revisão'}
              </h2>
              <p className="text-xs text-slate-500">
                Fixação rápida de conceitos técnicos e pegadinhas de TI
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Frente do Card */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Frente (Pergunta / Conceito-Chave)</span>
              <span className="text-[11px] font-normal text-slate-400">O que você precisa recordar</span>
            </label>
            <textarea
              rows={3}
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="Ex: Qual a diferença fundamental entre Governança e Gestão no COBIT 2019?"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white resize-none"
            />
          </div>

          {/* Verso do Card */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Verso (Resposta / Mnemônico / Fundamentação)</span>
              <span className="text-[11px] font-normal text-slate-400">Suporta Markdown e destaques</span>
            </label>
            <textarea
              rows={5}
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="Ex: Governança = EDM (Evaluate, Direct, Monitor). Gestão = PBRM (Plan, Build, Run, Monitor)."
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white resize-y"
            />
          </div>

          {/* Disciplina & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Disciplina (Opcional)
              </label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="Ex: Governança de TIC"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Ex: COBIT 2019, FGV, Pegadinha"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!front.trim() || !back.trim()}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Salvar Flashcard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
