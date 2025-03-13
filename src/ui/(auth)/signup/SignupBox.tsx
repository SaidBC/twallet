"use client";

import { useState } from "react";
import BoxHeader from "./BoxHeader";
import StepOneForm from "./StepOneForm";
import StepThreeForm from "./StepThreeForm";
import StepTwoForm from "./StepTwoForm";
import { IsignupState } from "@/types";
import getLocalStorageItem from "@/utils/getLocalStorageItem";

export default function SignupBox() {
  let signupState: IsignupState | null = getLocalStorageItem("signupState");

  const [currentStep, setCurrentStep] = useState<number>(
    signupState?.currentStep || 1
  );
  const [miniStep, setMiniStep] = useState<number>(signupState?.miniStep || 1);
  const handleNextMiniStep = () => setMiniStep((prev) => prev + 1);
  const handleBackMiniStep = () => setMiniStep((prev) => prev - 1);
  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handleReset = () => {
    setCurrentStep(1);
    setMiniStep(1);
  };
  return (
    <div className="bg-white w-lg rounded-4xl py-6 px-8 shadow-2xl">
      <BoxHeader
        canBackward={miniStep === 2 && currentStep === 1}
        currentStep={currentStep}
        handleBackMiniStep={handleBackMiniStep}
        handleReset={handleReset}
      />
      {currentStep === 1 && (
        <StepOneForm
          miniStep={miniStep}
          handleNextMiniStep={handleNextMiniStep}
          handleNextStep={handleNextStep}
        />
      )}
      {currentStep === 2 && <StepTwoForm handleNextStep={handleNextStep} />}
      {currentStep === 3 && <StepThreeForm />}
    </div>
  );
}
