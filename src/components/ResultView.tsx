import React from 'react';
import { ReportDashboard } from './ReportDashboard';
import { useQuiz } from '../context/QuizContext';

export const ResultView: React.FC = () => {
  const { report, profile, resetQuiz } = useQuiz();

  if (!report) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center p-6 text-center">
        <p className="text-slate-600 dark:text-slate-400">
          Belum ada hasil analisis. Silakan lengkapi kuesioner terlebih dahulu.
        </p>
        <button
          onClick={resetQuiz}
          className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Mulai Kuesioner
        </button>
      </div>
    );
  }

  return (
    <ReportDashboard
      report={report}
      maleName={profile.maleName}
      femaleName={profile.femaleName}
      onRetake={resetQuiz}
    />
  );
};

export { ReportDashboard };
export default ResultView;
