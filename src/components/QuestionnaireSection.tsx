import React, { useState } from 'react';
import { PSYCHOLOGY_QUESTIONS, PILLARS, type PillarId } from '../data/psychologyQuestions';
import type { UserAnswers } from '../utils/compatibilityEngine';
import {
  Coins,
  Home,
  HeartHandshake,
  ShieldCheck,
  Compass,
  User,
  Heart,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Wand2,
} from 'lucide-react';

interface QuestionnaireProps {
  maleAnswers: UserAnswers;
  femaleAnswers: UserAnswers;
  maleName: string;
  femaleName: string;
  onUpdateMaleAnswers: (answers: UserAnswers) => void;
  onUpdateFemaleAnswers: (answers: UserAnswers) => void;
  onCalculate: () => void;
}

const PILLAR_ICONS: Record<PillarId, React.ComponentType<{ className?: string }>> = {
  financial: Coins,
  domestic: Home,
  conflict: HeartHandshake,
  boundaries: ShieldCheck,
  vision: Compass,
};

export const QuestionnaireSection: React.FC<QuestionnaireProps> = ({
  maleAnswers,
  femaleAnswers,
  maleName,
  femaleName,
  onUpdateMaleAnswers,
  onUpdateFemaleAnswers,
  onCalculate,
}) => {
  const [activeGender, setActiveGender] = useState<'male' | 'female'>('male');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [filterPillar, setFilterPillar] = useState<PillarId | 'all'>('all');

  const currentQ = PSYCHOLOGY_QUESTIONS[currentIndex];
  const activeAnswers = activeGender === 'male' ? maleAnswers : femaleAnswers;
  const partnerAnswers = activeGender === 'male' ? femaleAnswers : maleAnswers;

  const maleAnsweredCount = Object.keys(maleAnswers).length;
  const femaleAnsweredCount = Object.keys(femaleAnswers).length;
  const totalQuestions = PSYCHOLOGY_QUESTIONS.length;

  const isMaleComplete = maleAnsweredCount === totalQuestions;
  const isFemaleComplete = femaleAnsweredCount === totalQuestions;
  const isBothComplete = isMaleComplete && isFemaleComplete;

  const handleSelectOption = (optionId: 'a' | 'b' | 'c' | 'd') => {
    if (activeGender === 'male') {
      onUpdateMaleAnswers({ ...maleAnswers, [currentQ.id]: optionId });
    } else {
      onUpdateFemaleAnswers({ ...femaleAnswers, [currentQ.id]: optionId });
    }
  };

  const handleQuickPreset = (type: 'high' | 'contrast' | 'balanced') => {
    if (type === 'high') {
      const male: UserAnswers = {};
      const female: UserAnswers = {};
      PSYCHOLOGY_QUESTIONS.forEach((q) => {
        male[q.id] = 'a';
        female[q.id] = 'a';
      });
      onUpdateMaleAnswers(male);
      onUpdateFemaleAnswers(female);
    } else if (type === 'contrast') {
      const male: UserAnswers = {
        q1: 'a', q2: 'a', q3: 'd', q4: 'a',
        q5: 'a', q6: 'a', q7: 'a', q8: 'a',
        q9: 'c', q10: 'a', q11: 'c', q12: 'a',
      };
      const female: UserAnswers = {
        q1: 'c', q2: 'b', q3: 'a', q4: 'b',
        q5: 'b', q6: 'd', q7: 'c', q8: 'c',
        q9: 'd', q10: 'c', q11: 'a', q12: 'd',
      };
      onUpdateMaleAnswers(male);
      onUpdateFemaleAnswers(female);
    } else {
      const male: UserAnswers = {
        q1: 'b', q2: 'c', q3: 'b', q4: 'c',
        q5: 'c', q6: 'b', q7: 'b', q8: 'b',
        q9: 'a', q10: 'b', q11: 'a', q12: 'b',
      };
      const female: UserAnswers = {
        q1: 'b', q2: 'c', q3: 'b', q4: 'c',
        q5: 'd', q6: 'b', q7: 'b', q8: 'd',
        q9: 'a', q10: 'b', q11: 'a', q12: 'b',
      };
      onUpdateMaleAnswers(male);
      onUpdateFemaleAnswers(female);
    }
  };

  const currentPillarMeta = PILLARS[currentQ.pillar];
  const PillarIcon = PILLAR_ICONS[currentQ.pillar];
  const selectedOptionId = activeAnswers[currentQ.id];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Controls & Gender Switcher */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-rose-100 dark:border-slate-800 p-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setActiveGender('male')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeGender === 'male'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{maleName || 'Pria'}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  activeGender === 'male'
                    ? 'bg-blue-700 text-blue-100'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {maleAnsweredCount}/{totalQuestions}
              </span>
            </button>

            <button
              onClick={() => setActiveGender('female')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeGender === 'female'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>{femaleName || 'Wanita'}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  activeGender === 'female'
                    ? 'bg-rose-600 text-rose-100'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {femaleAnsweredCount}/{totalQuestions}
              </span>
            </button>
          </div>

          {/* Quick preset selector for instant testing */}
          <div className="flex items-center gap-2 text-xs w-full md:w-auto justify-end">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Wand2 className="w-3.5 h-3.5 text-indigo-500" /> Contoh Preset:
            </span>
            <button
              onClick={() => handleQuickPreset('high')}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/50 hover:bg-emerald-100"
            >
              Tinggi (Harmonis)
            </button>
            <button
              onClick={() => handleQuickPreset('balanced')}
              className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200/50 hover:bg-indigo-100"
            >
              Moderat (Realistis)
            </button>
            <button
              onClick={() => handleQuickPreset('contrast')}
              className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/50 hover:bg-amber-100"
            >
              Kontras
            </button>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="mt-4 grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div>
            <div className="flex justify-between text-xs mb-1 text-slate-500">
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {maleName || 'Pria'} ({maleAnsweredCount}/{totalQuestions})
              </span>
              <span>{Math.round((maleAnsweredCount / totalQuestions) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full transition-all duration-300"
                style={{ width: `${(maleAnsweredCount / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1 text-slate-500">
              <span className="font-medium text-rose-500 dark:text-rose-400">
                {femaleName || 'Wanita'} ({femaleAnsweredCount}/{totalQuestions})
              </span>
              <span>{Math.round((femaleAnsweredCount / totalQuestions) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-rose-500 h-full transition-all duration-300"
                style={{ width: `${(femaleAnsweredCount / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-sm transition-all">
        {/* Category & Step Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <PillarIcon className="w-5 h-5" />
            </span>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
                {currentPillarMeta.name}
              </span>
              <h4 className="text-xs text-slate-500 dark:text-slate-400">
                {currentPillarMeta.description}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Soal {currentIndex + 1} dari {totalQuestions}
            </span>
          </div>
        </div>

        {/* Question Title & Prompt */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            {currentQ.title}
          </h3>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {activeGender === 'male' ? `Pertanyaan untuk ${maleName || 'Pria'}:` : `Pertanyaan untuk ${femaleName || 'Wanita'}:`}
            </span>{' '}
            {activeGender === 'male' ? currentQ.malePrompt : currentQ.femalePrompt}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const label = activeGender === 'male' ? opt.maleLabel : opt.femaleLabel;

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 ${
                  isSelected
                    ? activeGender === 'male'
                      ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/30 text-rose-900 dark:text-rose-100 shadow-sm ring-2 ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div
                  className={`w-6 h-6 mt-0.5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isSelected
                      ? activeGender === 'male'
                        ? 'bg-blue-600 text-white'
                        : 'bg-rose-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {opt.id.toUpperCase()}
                </div>
                <div className="flex-1 text-sm md:text-base leading-snug">{label}</div>
              </button>
            );
          })}
        </div>

        {/* Question Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          {/* Quick Question Number Grid */}
          <div className="hidden md:flex items-center gap-1">
            {PSYCHOLOGY_QUESTIONS.map((q, idx) => {
              const isAns = !!activeAnswers[q.id];
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 text-xs rounded-lg font-medium transition-all ${
                    isCurrent
                      ? activeGender === 'male'
                        ? 'bg-blue-600 text-white font-bold ring-2 ring-blue-400/30'
                        : 'bg-rose-500 text-white font-bold ring-2 ring-rose-400/30'
                      : isAns
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      : 'bg-slate-100 dark:bg-slate-800/60 text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
            disabled={currentIndex === totalQuestions - 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none"
          >
            <span>Selanjutnya</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Completion & Final Action Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 font-semibold">
            {isBothComplete ? (
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" /> Kuesioner Pasangan Lengkap
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-300">
                <AlertCircle className="w-5 h-5" /> Menunggu Kelengkapan Jawaban
              </span>
            )}
          </div>
          <p className="text-xs text-slate-300">
            {isBothComplete
              ? 'Seluruh 12 pertanyaan telah dijawab oleh kedua belah pihak. Siap menganalisis!'
              : `Pria: ${maleAnsweredCount}/${totalQuestions} | Wanita: ${femaleAnsweredCount}/${totalQuestions}. Isi hingga selesai untuk kalkulasi akurat.`}
          </p>
        </div>

        <button
          onClick={onCalculate}
          disabled={!isBothComplete}
          className="w-full md:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-500 hover:from-rose-600 hover:to-indigo-600 text-white shadow-lg shadow-rose-500/25 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Lihat Hasil & Analisis Kompatibilitas</span>
        </button>
      </div>
    </div>
  );
};
