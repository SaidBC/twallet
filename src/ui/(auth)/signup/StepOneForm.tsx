"use client";

import Input from "@/components/Inputs/Input";
import SubmitButton from "@/components/SubmitButton";
import TermsAndServices from "./TermsAndServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { MouseEventHandler, useState } from "react";
import emailSchema from "@/lib/schemas/emailSchema";
import codeSchema from "@/lib/schemas/codeSchema";
import { IsignupState } from "@/types";
import getLocalStorageItem from "@/utils/getLocalStorageItem";
const creationStartText = "You can create an account in one minute!";
const emailConfirmationText = "Check your email and enter confirmation code";

interface StepOneFormProps {
  miniStep: number;
  handleNextMiniStep: () => void;
  handleNextStep: () => void;
}

export default function StepOneForm({
  miniStep,
  handleNextMiniStep,
  handleNextStep,
}: StepOneFormProps) {
  let signupState: IsignupState | null = getLocalStorageItem("signupState");

  const [email, setEmail] = useState(signupState?.user.email || "");
  const [code, setCode] = useState("");
  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (miniStep === 1) {
      handleNextMiniStep();
      const state: IsignupState = {
        miniStep: 2,
        currentStep: 1,
        user: {
          email,
        },
      };
      window.localStorage.setItem("signupState", JSON.stringify(state));
    }
  };
  const handleContinueWithoutConfimation: MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    const state: IsignupState = {
      miniStep: 2,
      currentStep: 2,
      user: {
        email,
      },
    };
    if (miniStep === 2) {
      handleNextStep();
      window.localStorage.setItem("signupState", JSON.stringify(state));
    }
  };
  const isEmailValid = emailSchema.safeParse(email).success;
  const isCodeValid = codeSchema.safeParse(code).success;
  const isFormValid =
    miniStep === 1 ? isEmailValid : isEmailValid && isCodeValid;
  return (
    <form className="pt-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl max-w-sm self-center text-center">
          {miniStep === 1 && creationStartText}
          {miniStep === 2 && emailConfirmationText}
        </h1>
        <Input
          success={isEmailValid}
          disabled={miniStep === 2}
          label="Your email"
          type="email"
          placeholder="user@mali.com"
          name="email"
          id="email"
          value={email}
          setInput={setEmail}
        />
        {miniStep === 1 && <TermsAndServices />}
        <div className="grid grid-cols-2 gap-6">
          {miniStep === 2 && (
            <Input
              success={isCodeValid}
              setInput={setCode}
              label="Code"
              type="number"
              name="code"
              id="code"
            />
          )}
          <SubmitButton
            className={clsx(miniStep === 2 ? "self-end" : "col-[1_/_3]")}
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            Create account
          </SubmitButton>
        </div>
        {miniStep === 2 && (
          <button
            onClick={handleContinueWithoutConfimation}
            className="flex gap-2 items-center justify-center py-4 rounded-lg cursor-pointer font-bold border-2 border-sky-400 text-sky-400 hover:text-white hover:bg-sky-400"
          >
            <span>Continue without confirmation</span>
            <span>
              <FontAwesomeIcon icon={faArrowRightLong} />
            </span>
          </button>
        )}
      </div>
    </form>
  );
}
