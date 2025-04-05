"use client";
// next
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ProgressContext = {
  currentStep: number;
  handleNext: () => void;
  handleBack: () => void;
  goTo: (step: number) => void;
  totalSteps: number;
  progressPercentage: number;
};

const progressContext = createContext({} as ProgressContext);

export const useProgress = () => useContext(progressContext);

export default function ProgressProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  useEffect(() => {
    const savedStep = localStorage.getItem("steps");
    if (savedStep) return setCurrentStep(JSON.parse(savedStep));
  }, []);

  useEffect(
    () => localStorage.setItem("steps", JSON.stringify(currentStep)),
    [currentStep]
  );

  const totalSteps = 10;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goTo = (step: number) => {
    if (step <= 10 && step >= 1) {
      setCurrentStep(step);
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <progressContext.Provider
      value={{
        currentStep,
        handleNext,
        handleBack,
        goTo,
        totalSteps,
        progressPercentage,
      }}
    >
      {children}
    </progressContext.Provider>
  );
}
