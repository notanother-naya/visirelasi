import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { PSYCHOLOGY_QUESTIONS } from '../data/psychologyQuestions';
import { calculateCompatibility, type UserAnswers, type CompatibilityReport } from '../utils/compatibilityEngine';

export type QuizStep = 'intro' | 'questionnaire' | 'profile' | 'male_quiz' | 'handover' | 'female_quiz' | 'result';

export interface UserProfile {
  maleName: string;
  femaleName: string;
  relationshipDuration: string;
}

interface QuizContextType {
  currentStep: QuizStep;
  step: QuizStep;
  profile: UserProfile;
  maleName: string;
  femaleName: string;
  maleAnswers: UserAnswers;
  femaleAnswers: UserAnswers;
  report: CompatibilityReport | null;
  result: CompatibilityReport | null;
  currentQuestionIndex: number;
  setCurrentStep: (step: QuizStep) => void;
  setStep: (step: QuizStep) => void;
  updateProfile: (profileUpdate: Partial<UserProfile>) => void;
  setMaleName: (name: string) => void;
  setFemaleName: (name: string) => void;
  setMaleAnswers: React.Dispatch<React.SetStateAction<UserAnswers>>;
  setFemaleAnswers: React.Dispatch<React.SetStateAction<UserAnswers>>;
  answerQuestion: (gender: 'male' | 'female', questionId: string, option: 'a' | 'b' | 'c' | 'd') => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  startQuiz: (mName?: string, fName?: string) => void;
  submitSection: (gender?: 'male' | 'female') => void;
  confirmHandover: () => void;
  calculateAndShowResult: () => void;
  resetQuiz: () => void;
  fillSampleData: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<QuizStep>('intro');
  const [profile, setProfile] = useState<UserProfile>({
    maleName: 'Rian',
    femaleName: 'Sarah',
    relationshipDuration: '1-3 tahun',
  });
  const [maleAnswers, setMaleAnswers] = useState<UserAnswers>({});
  const [femaleAnswers, setFemaleAnswers] = useState<UserAnswers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [report, setReport] = useState<CompatibilityReport | null>(null);

  const updateProfile = (profileUpdate: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...profileUpdate }));
    setCurrentStep('questionnaire');
  };

  const setMaleName = (name: string) => {
    setProfile((prev) => ({ ...prev, maleName: name }));
  };

  const setFemaleName = (name: string) => {
    setProfile((prev) => ({ ...prev, femaleName: name }));
  };

  const startQuiz = (mName?: string, fName?: string) => {
    if (mName || fName) {
      setProfile((prev) => ({
        ...prev,
        maleName: mName?.trim() || prev.maleName || 'Rian',
        femaleName: fName?.trim() || prev.femaleName || 'Sarah',
      }));
    }
    setMaleAnswers({});
    setFemaleAnswers({});
    setCurrentQuestionIndex(0);
    setReport(null);
    setCurrentStep('questionnaire');
  };

  const submitSection = (gender?: 'male' | 'female') => {
    const targetGender = gender || (currentStep === 'male_quiz' ? 'male' : 'female');
    if (targetGender === 'male') {
      setCurrentQuestionIndex(0);
      setCurrentStep('handover');
    } else {
      const res = calculateCompatibility(maleAnswers, femaleAnswers);
      setReport(res);
      setCurrentStep('result');
    }
  };

  const answerQuestion = (gender: 'male' | 'female', questionId: string, option: 'a' | 'b' | 'c' | 'd') => {
    if (gender === 'male') {
      setMaleAnswers((prev) => ({ ...prev, [questionId]: option }));
    } else {
      setFemaleAnswers((prev) => ({ ...prev, [questionId]: option }));
    }
  };

  const nextQuestion = () => {
    if (currentStep === 'male_quiz') {
      if (currentQuestionIndex < PSYCHOLOGY_QUESTIONS.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setCurrentQuestionIndex(0);
        setCurrentStep('handover');
      }
    } else if (currentStep === 'female_quiz') {
      if (currentQuestionIndex < PSYCHOLOGY_QUESTIONS.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        const res = calculateCompatibility(maleAnswers, femaleAnswers);
        setReport(res);
        setCurrentStep('result');
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const confirmHandover = () => {
    setCurrentQuestionIndex(0);
    setCurrentStep('female_quiz');
  };

  const calculateAndShowResult = () => {
    const res = calculateCompatibility(maleAnswers, femaleAnswers);
    setReport(res);
    setCurrentStep('result');
  };

  const fillSampleData = () => {
    const sampleMale: UserAnswers = {};
    const sampleFemale: UserAnswers = {};
    const options: ('a' | 'b' | 'c' | 'd')[] = ['a', 'b', 'c', 'd'];
    PSYCHOLOGY_QUESTIONS.forEach((q, idx) => {
      sampleMale[q.id] = options[idx % 4];
      sampleFemale[q.id] = options[(idx + 1) % 4];
    });
    setMaleAnswers(sampleMale);
    setFemaleAnswers(sampleFemale);
    setProfile({
      maleName: 'Rian Pratama',
      femaleName: 'Sarah Amanda',
      relationshipDuration: '1-3 tahun',
    });
    const res = calculateCompatibility(sampleMale, sampleFemale);
    setReport(res);
    setCurrentStep('result');
  };

  const resetQuiz = () => {
    setCurrentStep('intro');
    setProfile({
      maleName: 'Rian',
      femaleName: 'Sarah',
      relationshipDuration: '1-3 tahun',
    });
    setMaleAnswers({});
    setFemaleAnswers({});
    setCurrentQuestionIndex(0);
    setReport(null);
  };

  return (
    <QuizContext.Provider
      value={{
        currentStep,
        step: currentStep,
        profile,
        maleName: profile.maleName,
        femaleName: profile.femaleName,
        maleAnswers,
        femaleAnswers,
        report,
        result: report,
        currentQuestionIndex,
        setCurrentStep,
        setStep: setCurrentStep,
        updateProfile,
        setMaleName,
        setFemaleName,
        setMaleAnswers,
        setFemaleAnswers,
        answerQuestion,
        nextQuestion,
        prevQuestion,
        startQuiz,
        submitSection,
        confirmHandover,
        calculateAndShowResult,
        resetQuiz,
        fillSampleData,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

