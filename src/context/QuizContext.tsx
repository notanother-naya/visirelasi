import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PSYCHOLOGY_QUESTIONS } from '../data/psychologyQuestions';
import { calculateCompatibility, type UserAnswers, type CompatibilityResult } from '../utils/compatibilityEngine';

export type QuizStep = 'intro' | 'profile' | 'male_quiz' | 'handover' | 'female_quiz' | 'result';

interface QuizContextType {
  step: QuizStep;
  maleName: string;
  femaleName: string;
  maleAnswers: UserAnswers;
  femaleAnswers: UserAnswers;
  currentQuestionIndex: number;
  result: CompatibilityResult | null;
  setStep: (step: QuizStep) => void;
  setMaleName: (name: string) => void;
  setFemaleName: (name: string) => void;
  answerQuestion: (gender: 'male' | 'female', questionId: string, optionIndex: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  startQuiz: (mName: string, fName: string) => void;
  confirmHandover: () => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<QuizStep>('intro');
  const [maleName, setMaleName] = useState<string>('Cowo');
  const [femaleName, setFemaleName] = useState<string>('Cewe');
  const [maleAnswers, setMaleAnswers] = useState<UserAnswers>({});
  const [femaleAnswers, setFemaleAnswers] = useState<UserAnswers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const startQuiz = (mName: string, fName: string) => {
    setMaleName(mName.trim() || 'Cowo');
    setFemaleName(fName.trim() || 'Cewe');
    setMaleAnswers({});
    setFemaleAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
    setStep('male_quiz');
  };

  const answerQuestion = (gender: 'male' | 'female', questionId: string, optionIndex: number) => {
    if (gender === 'male') {
      setMaleAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    } else {
      setFemaleAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    }
  };

  const nextQuestion = () => {
    if (step === 'male_quiz') {
      if (currentQuestionIndex < PSYCHOLOGY_QUESTIONS.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // Finished male quiz -> Handover step
        setCurrentQuestionIndex(0);
        setStep('handover');
      }
    } else if (step === 'female_quiz') {
      if (currentQuestionIndex < PSYCHOLOGY_QUESTIONS.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // Finished female quiz -> Compute results & show Result
        const res = calculateCompatibility(maleAnswers, femaleAnswers, maleName, femaleName);
        setResult(res);
        setStep('result');
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
    setStep('female_quiz');
  };

  const resetQuiz = () => {
    setStep('intro');
    setMaleName('Cowo');
    setFemaleName('Cewe');
    setMaleAnswers({});
    setFemaleAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
  };

  return (
    <QuizContext.Provider
      value={{
        step,
        maleName,
        femaleName,
        maleAnswers,
        femaleAnswers,
        currentQuestionIndex,
        result,
        setStep,
        setMaleName,
        setFemaleName,
        answerQuestion,
        nextQuestion,
        prevQuestion,
        startQuiz,
        confirmHandover,
        resetQuiz,
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
