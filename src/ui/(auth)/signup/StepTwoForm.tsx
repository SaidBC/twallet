"use client";

import Input from "@/components/Inputs/Input";
import SubmitButton from "@/components/SubmitButton";
import getLastUser from "@/lib/getTotalUsers";
import { IsignupState } from "@/types";
import generatePassword from "@/utils/generatePassword";
import getLocalStorageItem from "@/utils/getLocalStorageItem";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler, useEffect, useState } from "react";

export default function StepTwoForm({
  handleNextStep,
}: {
  handleNextStep: () => void;
}) {
  const signupState: IsignupState | null = getLocalStorageItem("signupState");

  const [password, setPassword] = useState(signupState?.user.password || "");
  const [repeatPassword, setRepeatPassword] = useState(
    signupState?.user.password || ""
  );
  const [secretCode, setSecretCode] = useState(
    signupState?.user.secretCode || ""
  );
  const [accountName, setAccountName] = useState(
    signupState?.user.accountName || ""
  );
  useEffect(() => {
    if (signupState !== null) {
      if (
        !signupState.user.accountName ||
        !signupState.user.password ||
        !signupState.user.secretCode
      )
        (async function () {
          const users = await getLastUser();
          const generatedPassword =
            signupState.user.password || generatePassword(10);
          const randomNum =
            signupState.user.secretCode || (Math.random() * 999999).toFixed(0);
          const state: IsignupState = {
            currentStep: 2,
            miniStep: 2,
            user: {
              email: signupState.user.email,
              password: generatedPassword,
              secretCode: randomNum,
              accountName: "P" + (users + 1),
            },
          };
          setAccountName((prev) => "P" + (users + 1));
          setPassword(generatedPassword);
          setRepeatPassword(generatedPassword);
          setSecretCode(randomNum);
          window.localStorage.setItem("signupState", JSON.stringify(state));
        })();
    }
  }, []);

  const isFormValid =
    password.length >= 6 &&
    repeatPassword.length >= 6 &&
    secretCode.length >= 6 &&
    accountName.length >= 6;

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    handleNextStep();
    const state: IsignupState = {
      currentStep: 3,
      miniStep: 2,
      user: {
        email: signupState?.user.email,
        password,
        secretCode,
        accountName,
      },
    };
    window.localStorage.setItem("signupState", JSON.stringify(state));
  };

  return (
    <form action="" className="pt-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl max-w-sm self-center text-center">
          Please save it in a safe place!
        </h1>
        <Input
          success={password.length >= 6}
          setInput={setPassword}
          value={password}
          type="text"
          name="password"
          label="Password"
          placeholder="Password"
        />
        <Input
          success={repeatPassword.length >= 6}
          setInput={setRepeatPassword}
          value={repeatPassword}
          type="text"
          name="repeat_password"
          label="Repeat password"
          placeholder="Repeat password"
        />
        <Input
          success={secretCode.length >= 6}
          value={secretCode}
          setInput={setSecretCode}
          type="text"
          name="secret_code"
          label="Secret code"
          placeholder="Secret code"
        />
        <Input
          success={accountName.length >= 6}
          value={accountName}
          setInput={setAccountName}
          type="text"
          name="account_name"
          label="Account name"
          placeholder="Account name"
        />
        <SubmitButton
          onClick={handleSubmit}
          className="flex items-center self-center gap-8 px-6 "
          disabled={!isFormValid}
        >
          <span></span>
          <span>Next</span>
          <FontAwesomeIcon icon={faArrowRightLong} />
        </SubmitButton>
      </div>
    </form>
  );
}
