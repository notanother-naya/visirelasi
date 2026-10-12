import React, { useState } from 'react';
import type { CompatibilityReport, PillarScore } from '../utils/compatibilityEngine';
import { PILLARS, type PillarId } from '../data/psychologyQuestions';
import {
  Coins,
  Home,
  HeartHandshake,
  ShieldCheck,
  Compass,
  Sparkles,
  Download,
  Share2,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Flame,
  Lightbulb,
  MessageCircleQuestion,
  ChevronDown,
  ChevronUp,
  FileText,
  Printer,
  Check,
} from 'lucide-react';

interface ReportDashboardProps {
  report: CompatibilityReport;
  maleName: string;
  femaleName: string;
  onRetake: () => void;
}

const PILLAR_ICONS: Record<PillarId, React.ComponentType<{ className?: string }>> = {
  financial: Coins,
  domestic: Home,
  conflict: HeartHandshake,
  boundaries: ShieldCheck,
  vision: Compass,
};

export const ReportDashboard: React.FC<ReportDashboardProps> = ({
  report,
  maleName,
  femaleName,
  onRetake,
}) => {
  const [showAllDetails, setShowAllDetails] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const mName = maleName || 'Pria';
  const fName = femaleName || 'Wanita';

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const lines = [
      `# Laporan Kompatibilitas Visi Relasi Pasangan`,
      `**Pasangan:** ${mName} & ${fName}`,
      `**Tanggal:** ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}`,
      `**Skor Kompatibilitas Keseluruhan:** ${report.overallScore}% (${report.tier.badge})`,
      `\n## Ringkasan Psikologis`,
      `${report.tier.description}`,
      `\n## Skor Per Pilar Hubungan`,
      ...report.pillars.map(
        (p) => `- **${p.pillarName}:** ${p.score}% — *${p.insight}*`
      ),
      `\n## Sinergi & Kekuatan Utama`,
      ...report.keyStrengths.map(
        (s) =>
          `### ${s.question.title} (${s.score}%)\n- **${mName}:** ${s.maleLabel}\n- **${fName}:** ${s.femaleLabel}\n- *Analisis:* ${s.note}`
      ),
      `\n## Titik Diskusi Kritis & Blindspot`,
      ...report.criticalDiscussions.map(
        (c) =>
          `### ${c.question.title} (${c.score}%)\n- **${mName}:** ${c.maleLabel}\n- **${fName}:** ${c.femaleLabel}\n- *Rekomendasi Diskusi:* ${c.note}`
      ),
      `\n## Panduan Komitmen & Langkah Aksi`,
      ...report.actionRecommendations.map((r, i) => `${i + 1}. ${r}`),
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VisiRelasi-${mName.replace(/\s+/g, '')}-${fName.replace(/\s+/g, '')}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const text = `Hasil Analisis Visi Relasi (${mName} & ${fName}): Skor Kompatibilitas ${report.overallScore}% - ${report.tier.badge}! Cek keselarasan visi hidup pasanganmu.`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in-50 duration-500">
      {/* Top Banner Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm print:hidden">
        <button
          onClick={onRetake}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Ubah Jawaban / Ulangi</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 transition-all"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Tersalin!' : 'Salin Ringkasan'}</span>
          </button>
          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 hover:bg-indigo-100 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Markdown</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 hover:bg-rose-100 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* Main Score Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 md:p-10 shadow-xl border border-indigo-500/20">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-pink-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Analisis Hubungan: {mName} & {fName}</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              {report.tier.title}
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
              {report.tier.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-xs px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Kategori: {report.tier.badge}
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                12 Parameter Psikometri Terpenuhi
              </span>
            </div>
          </div>

          {/* Circular Score Visual */}
          <div className="relative flex flex-col items-center justify-center shrink-0">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-indigo-500/30 bg-slate-800/80 backdrop-blur-md flex flex-col items-center justify-center shadow-inner ring-8 ring-indigo-500/10">
              <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 via-rose-300 to-indigo-300 bg-clip-text text-transparent">
                {report.overallScore}%
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-slate-400 mt-1">
                Kesesuaian
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Pillars Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Profil Keselarasan 5 Pilar Relasi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluasi mendalam Gottman Sound Relationship House
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report.pillars.map((pillar) => {
            const Icon = PILLAR_ICONS[pillar.pillarId];
            const isHigh = pillar.score >= 85;
            const isMed = pillar.score >= 70 && pillar.score < 85;

            return (
              <div
                key={pillar.pillarId}
                className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-800/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {pillar.pillarName}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-black ${
                        isHigh
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : isMed
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {pillar.score}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-2.5">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isHigh
                          ? 'bg-emerald-500'
                          : isMed
                          ? 'bg-indigo-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${pillar.score}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                  {pillar.insight}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column: Key Strengths vs Blindspots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Key Strengths */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-emerald-950/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base mb-4">
            <CheckCircle className="w-5 h-5" />
            <span>Pilar Sinergi & Kekuatan Utama</span>
          </div>

          <div className="space-y-4">
            {report.keyStrengths.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/60 dark:border-emerald-900/40 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                  <span>{item.question.title}</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{item.score}%</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Discussions */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-amber-100 dark:border-amber-950/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-base mb-4">
            <AlertTriangle className="w-5 h-5" />
            <span>Titik Diskusi Kritis & Penyelarasan</span>
          </div>

          <div className="space-y-4">
            {report.criticalDiscussions.length > 0 ? (
              report.criticalDiscussions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100/60 dark:border-amber-900/40 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span>{item.question.title}</span>
                    <span className="text-amber-600 dark:text-amber-400">{item.score}%</span>
                  </div>
                  <div className="text-slate-500 dark:text-slate-400">
                    <div>• <strong>{mName}:</strong> {item.maleLabel}</div>
                    <div>• <strong>{fName}:</strong> {item.femaleLabel}</div>
                  </div>
                  <p className="text-amber-800 dark:text-amber-300 font-medium">{item.note}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                Tidak ditemukan benturan kritis yang signifikan. Kompatibilitas kalian berada di rentang sangat aman!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Plan & Deep Talk Protocol */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-slate-900 dark:via-indigo-950/30 dark:to-slate-900 rounded-2xl border border-indigo-100 dark:border-slate-800 p-6 md:p-8">
        <div className="flex items-center gap-2.5 text-indigo-700 dark:text-indigo-300 font-bold text-lg mb-4">
          <Lightbulb className="w-5 h-5" />
          <span>Panduan Komitmen & Langkah Aksi Bersama</span>
        </div>

        <div className="space-y-3">
          {report.actionRecommendations.map((rec, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-indigo-50 dark:border-slate-800 text-sm"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-slate-700 dark:text-slate-200 leading-snug">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Collapsible Full Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <button
          onClick={() => setShowAllDetails(!showAllDetails)}
          className="w-full flex items-center justify-between text-left font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-500" />
            <span>Lihat Rincian Lengkap Jawaban 12 Pertanyaan</span>
          </div>
          {showAllDetails ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>

        {showAllDetails && (
          <div className="mt-6 space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            {report.detailedQuestions.map((q, idx) => (
              <div
                key={q.question.id}
                className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 text-xs md:text-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {idx + 1}. {q.question.title} ({PILLARS[q.question.pillar].name})
                  </span>
                  <span
                    className={`font-black px-2 py-0.5 rounded-md ${
                      q.score >= 85
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : q.score >= 70
                        ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {q.score}%
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/30">
                    <span className="font-semibold text-blue-700 dark:text-blue-300 block mb-1">
                      {mName} (Opsi {q.maleAnswer.toUpperCase()}):
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">{q.maleLabel}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100/50 dark:border-rose-900/30">
                    <span className="font-semibold text-rose-700 dark:text-rose-300 block mb-1">
                      {fName} (Opsi {q.femaleAnswer.toUpperCase()}):
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">{q.femaleLabel}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 italic pt-1">
                  💡 <strong>Catatan Sinergi:</strong> {q.note}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
