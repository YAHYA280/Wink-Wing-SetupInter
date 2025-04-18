"use client";
// next
import React, {
  createContext,
  useContext,
  useState,
  ReactElement,
  ReactNode,
} from "react";

// Rename the type to StepFormContextType
type StepFormContextType = {
  currentStepIndex: number;
  step: ReactElement;
  steps: ReactElement[];
  next: () => void;
  back: () => void;
  goTo: (index: number) => void;
};

// Keep the variable name
const StepFormContext = createContext({} as StepFormContextType);

export const useStepForm = () => useContext(StepFormContext);

export default function StepFormProvider({
  children,
  steps,
}: {
  children: ReactNode;
  steps: ReactElement[];
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  function next() {
    setCurrentStepIndex((i) => (i >= steps.length - 1 ? i : i + 1));
  }

  function back() {
    setCurrentStepIndex((i) => (i <= 0 ? i : i - 1));
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return (
    <StepFormContext.Provider
      value={{
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        next,
        back,
        goTo,
      }}
    >
      {children}
    </StepFormContext.Provider>
  );
}