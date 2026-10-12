import React, { useState } from 'react';
import { QuizProvider, useQuiz } from './context/QuizContext';
import { QuestionnaireSection } from './components/QuestionnaireSection';
import { ResultView } from './components/ResultView';
import { Heart, Sparkles, Compass, Shield, Users, RefreshCw } from 'lucide-react';

const MainApp: React.FC = () => {
  const {
    currentStep,
    profile,
    maleAnswers,
    femaleAnswers,
    updateProfile,
    setMaleAnswers,
    setFemaleAnswers,
    calculateAndShowResult,
    resetQuiz,
    fillSampleData,
  } = useQuiz();

  const [maleInput, setMaleInput] = useState(profile.maleName);
  const [femaleInput, setFemaleInput] = useState(profile.femaleName);
  const [relationshipDuration, setRelationshipDuration] = useState(profile.relationshipDuration || '1-3 tahun');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!maleInput.trim() || !femaleInput.trim()) return;
    updateProfile({
      maleName: maleInput.trim(),
      femaleName: femaleInput.trim(),
      relationshipDuration,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={resetQuiz}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent leading-none">
                VisiRelasi
              </h1>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                Psychological Alignment Engine
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentStep !== 'intro' && (
              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
                title="Mulai Ulang"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ulangi</span>
              </button>
            )}
            <div className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/50 text-indigo-300">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>Gottman & Sternberg Model</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        {currentStep === 'intro' && (
          <div className="max-w-2xl mx-auto">
            {/* Hero Card */}
            <div className="text-center space-y-4 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 text-xs font-medium">
                <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" />
                <span>Analisis Kompatibilitas Visioner Pasangan</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Seberapa Selaras Visi Masa Depan{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Kalian Berdua?
                </span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                Bukan sekadar tes zodiak atau kuis cinta biasa. VisiRelasi menggunakan kerangka psikologi relasional (5 pilar: Finansial, Domestik, Resolusi Konflik, Batasan Sosial, dan Visi Hidup) dengan perspektif gender cowok & cewek.
              </p>
            </div>

            {/* Profile Input Form */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

              <form onSubmit={handleStart} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      Nama Pasangan Pria (Cowok)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Rian"
                      value={maleInput}
                      onChange={(e) => setMaleInput(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-pink-400" />
                      Nama Pasangan Wanita (Cewek)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Sarah"
                      value={femaleInput}
                      onChange={(e) => setFemaleInput(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Status / Durasi Hubungan
                  </label>
                  <select
                    value={relationshipDuration}
                    onChange={(e) => setRelationshipDuration(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all"
                  >
                    <option value="PDKT / Baru Mulai">PDKT / Tahap Pendekatan</option>
                    <option value="Kurang dari 1 tahun">Pacaran &lt; 1 Tahun</option>
                    <option value="1-3 tahun">Pacaran 1 - 3 Tahun</option>
                    <option value="Lebih dari 3 tahun">Pacaran &gt; 3 Tahun</option>
                    <option value="Bertunangan">Bertunangan (Persiapan Nikah)</option>
                    <option value="Menikah">Menikah</option>
                  </select>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-indigo-600/25 transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Mulai Tes Kompatibilitas
                  </button>

                  <button
                    type="button"
                    onClick={fillSampleData}
                    className="sm:w-auto bg-slate-800/90 hover:bg-slate-700/90 text-slate-300 font-medium py-3 px-4 rounded-xl border border-slate-700 text-xs transition-all flex items-center justify-center gap-1.5"
                    title="Isi contoh otomatis untuk preview"
                  >
                    Contoh Cepat
                  </button>
                </div>
              </form>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-4 flex items-start space-x-3">
                <Shield className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold text-slate-200">100% Privat & Client-Side</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Semua data kuesioner diproses langsung di browsermu tanpa dikirim ke server luar.</p>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-4 flex items-start space-x-3">
                <Users className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold text-slate-200">2 Sudut Pandang Pasangan</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Pertanyaan disesuaikan dengan dinamika gender & ekspektasi masing-masing peran.</p>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-4 flex items-start space-x-3">
                <Compass className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold text-slate-200">Action Plan Relasional</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Dapatkan peta radar, identifikasi titik friksi (friction points), dan rekomendasi komunikasi.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {(currentStep === 'questionnaire' || currentStep === 'male_quiz' || currentStep === 'handover' || currentStep === 'female_quiz') && (
          <QuestionnaireSection
            maleAnswers={maleAnswers}
            femaleAnswers={femaleAnswers}
            maleName={profile.maleName}
            femaleName={profile.femaleName}
            onUpdateMaleAnswers={setMaleAnswers}
            onUpdateFemaleAnswers={setFemaleAnswers}
            onCalculate={calculateAndShowResult}
          />
        )}

        {currentStep === 'result' && <ResultView />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>VisiRelasi &copy; {new Date().getFullYear()} &mdash; Psikologi Relasional & Keselarasan Visi Pasangan</span>
          <span className="text-slate-600">PWA Offline-Ready &bull; Dibuat untuk Refleksi Hubungan Berdua</span>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <QuizProvider>
      <MainApp />
    </QuizProvider>
  );
};

export default App;
