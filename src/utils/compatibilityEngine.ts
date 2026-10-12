import { PSYCHOLOGY_QUESTIONS, PILLARS, type PillarId, type Question } from '../data/psychologyQuestions';

export type UserAnswers = Record<string, 'a' | 'b' | 'c' | 'd'>;

export interface PillarScore {
  pillarId: PillarId;
  pillarName: string;
  score: number;
  questionCount: number;
  status: 'optimal' | 'moderate' | 'critical';
  insight: string;
}

export interface CompatibilityTier {
  scoreRange: string;
  badge: string;
  title: string;
  description: string;
  themeColor: string;
}

export interface QuestionAnalysis {
  question: Question;
  maleAnswer: 'a' | 'b' | 'c' | 'd';
  femaleAnswer: 'a' | 'b' | 'c' | 'd';
  maleLabel: string;
  femaleLabel: string;
  score: number;
  note: string;
}

export interface CompatibilityReport {
  overallScore: number;
  tier: CompatibilityTier;
  pillars: PillarScore[];
  strongestPillars: PillarScore[];
  weakestPillars: PillarScore[];
  detailedQuestions: QuestionAnalysis[];
  keyStrengths: QuestionAnalysis[];
  criticalDiscussions: QuestionAnalysis[];
  actionRecommendations: string[];
}

export function getTier(score: number): CompatibilityTier {
  if (score >= 90) {
    return {
      scoreRange: '90 - 100%',
      badge: 'Visionary Soulmates',
      title: 'Keselarasan Visioner Sangat Luar Biasa',
      description: 'Fondasi nilai hidup, ekspektasi masa depan, dan cara resolusi konflik kalian berada dalam satu harmoni frekuensi yang matang dan saling menguatkan.',
      themeColor: 'emerald',
    };
  }
  if (score >= 78) {
    return {
      scoreRange: '78 - 89%',
      badge: 'Highly Harmonious',
      title: 'Harmoni & Sinergi Kuat',
      description: 'Kalian memiliki kompatibilitas tinggi di mayoritas pilar vital hubungan. Sedikit perbedaan sudut pandang dapat menjadi bumbu komplementer yang memperkaya hubungan.',
      themeColor: 'indigo',
    };
  }
  if (score >= 65) {
    return {
      scoreRange: '65 - 77%',
      badge: 'Promising with Alignment Areas',
      title: 'Potensi Bagus dengan Titik Diskusi Penting',
      description: 'Ada kecocokan dasar yang baik, namun terdapat beberapa perbedaan ekspektasi peran atau finansial yang wajib disepakati secara eksplisit sebelum melangkah jauh.',
      themeColor: 'amber',
    };
  }
  return {
    scoreRange: '< 65%',
    badge: 'Deep Conversation Needed',
    title: 'Perbedaan Paradigma Perlu Penyelarasan',
    description: 'Bukan berarti tidak cocok, tetapi kalian memiliki filosofi hidup dan ekspektasi peran yang sangat kontras. Diskusi terbuka dan kompromi mendalam sangat esensial.',
    themeColor: 'rose',
  };
}

export function calculateCompatibility(
  maleAnswers: UserAnswers,
  femaleAnswers: UserAnswers
): CompatibilityReport {
  const detailedQuestions: QuestionAnalysis[] = [];
  const pillarMap: Record<PillarId, { totalScore: number; count: number }> = {
    financial: { totalScore: 0, count: 0 },
    domestic: { totalScore: 0, count: 0 },
    conflict: { totalScore: 0, count: 0 },
    boundaries: { totalScore: 0, count: 0 },
    vision: { totalScore: 0, count: 0 },
  };

  let totalScoreSum = 0;
  let totalQuestionsCount = 0;

  for (const q of PSYCHOLOGY_QUESTIONS) {
    const maleAns = maleAnswers[q.id] || 'a';
    const femaleAns = femaleAnswers[q.id] || 'a';

    const matrixEntry = q.matrix[maleAns]?.[femaleAns] || {
      score: 75,
      note: 'Perlu diskusi lanjutan untuk menyelaraskan ekspektasi.',
    };

    const maleOption = q.options.find((o) => o.id === maleAns);
    const femaleOption = q.options.find((o) => o.id === femaleAns);

    const itemAnalysis: QuestionAnalysis = {
      question: q,
      maleAnswer: maleAns,
      femaleAnswer: femaleAns,
      maleLabel: maleOption ? maleOption.maleLabel : '',
      femaleLabel: femaleOption ? femaleOption.femaleLabel : '',
      score: matrixEntry.score,
      note: matrixEntry.note,
    };

    detailedQuestions.push(itemAnalysis);

    pillarMap[q.pillar].totalScore += matrixEntry.score;
    pillarMap[q.pillar].count += 1;

    totalScoreSum += matrixEntry.score;
    totalQuestionsCount += 1;
  }

  const overallScore = Math.round(totalScoreSum / Math.max(1, totalQuestionsCount));
  const tier = getTier(overallScore);

  const pillars: PillarScore[] = (Object.keys(pillarMap) as PillarId[]).map((pid) => {
    const pData = pillarMap[pid];
    const pScore = pData.count > 0 ? Math.round(pData.totalScore / pData.count) : 0;
    const status: PillarScore['status'] =
      pScore >= 85 ? 'optimal' : pScore >= 70 ? 'moderate' : 'critical';

    let insight = '';
    if (status === 'optimal') {
      insight = 'Keselarasan visi sangat tinggi, saling mendukung tanpa friksi berarti.';
    } else if (status === 'moderate') {
      insight = 'Cukup selaras, perlu aturan main (ground rules) bersama yang jelas.';
    } else {
      insight = 'Perbedaan pandangan mendasar; luangkan waktu khusus untuk deep talk.';
    }

    return {
      pillarId: pid,
      pillarName: PILLARS[pid].name,
      score: pScore,
      questionCount: pData.count,
      status,
      insight,
    };
  });

  // Sort pillars for strongest & weakest
  const sortedPillars = [...pillars].sort((a, b) => b.score - a.score);
  const strongestPillars = sortedPillars.slice(0, 2);
  const weakestPillars = [...sortedPillars].reverse().slice(0, 2);

  // Key strengths (score >= 90)
  const keyStrengths = detailedQuestions
    .filter((d) => d.score >= 90)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Critical discussions (score < 80, prioritize lowest)
  const criticalDiscussions = detailedQuestions
    .filter((d) => d.score < 80)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  // Generate action recommendations based on findings
  const actionRecommendations: string[] = [];

  if (pillarMap.financial.totalScore / pillarMap.financial.count < 75) {
    actionRecommendations.push(
      'Jadwalkan kencan khusus "Money Date" untuk menyepakati batas transaksi mandiri dan pembagian pos rekening bersama.'
    );
  }
  if (pillarMap.conflict.totalScore / pillarMap.conflict.count < 75) {
    actionRecommendations.push(
      'Sepakati "Protokol Gencatan Senjata": Batas waktu jeda emosi maksimal 1 jam dan aturan tidak membawa masalah luar ke ranjang.'
    );
  }
  if (pillarMap.domestic.totalScore / pillarMap.domestic.count < 75) {
    actionRecommendations.push(
      'Petakan ekspektasi harian tugas domestik dan pemanfaatan asisten/teknologi agar tidak terjadi beban ganda sepihak.'
    );
  }
  if (pillarMap.boundaries.totalScore / pillarMap.boundaries.count < 75) {
    actionRecommendations.push(
      'Buat batasan sosial yang nyaman bagi kedua pihak perihal nongkrong lawan jenis dan keterbukaan password gadget.'
    );
  }
  if (pillarMap.vision.totalScore / pillarMap.vision.count < 75) {
    actionRecommendations.push(
      'Samakan timeline 3-5 tahun: Prioritas memiliki hunian mandiri vs mobilitas karir dan keterlibatan keluarga besar.'
    );
  }

  // Default recommendations if high compatibility
  if (actionRecommendations.length === 0) {
    actionRecommendations.push(
      'Pertahankan ritual mingguan "State of the Union" (cek keintiman emosional 30 menit per minggu).',
      'Dokumentasikan prinsip komitmen kalian sebagai pedoman bersama saat menghadapi dinamika hidup baru.',
      'Rayakan keselarasan ini dengan merencanakan milestone impian berdua untuk 3 tahun ke depan.'
    );
  }

  return {
    overallScore,
    tier,
    pillars,
    strongestPillars,
    weakestPillars,
    detailedQuestions,
    keyStrengths,
    criticalDiscussions,
    actionRecommendations,
  };
}
