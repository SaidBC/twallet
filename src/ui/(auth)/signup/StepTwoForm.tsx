"use client";

import ErrorText from "@/components/ErrorText";
import Input from "@/components/Inputs/Input";
import SubmitButton from "@/components/SubmitButton";
import { stepTwoFormAction } from "@/lib/actions";
import getLastUser from "@/lib/getTotalUsers";
import { AuthFormState, IsignupState } from "@/types";
import generatePassword from "@/utils/generatePassword";
import getLocalStorageItem from "@/utils/getLocalStorageItem";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  MouseEventHandler,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";

const initialValue: AuthFormState = {
  isSuccess: false,
  isError: false,
  errors: {},
};

export default function StepTwoForm({
  handleNextStep,
}: {
  handleNextStep: () => void;
}) {
  const signupState: IsignupState | null = getLocalStorageItem("signupState");
  const [formState, formAction, isPending] = useActionState(
    stepTwoFormAction,
    initialValue
  );
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
    if (formState.isSuccess) {
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
    }
  }, [formState.isSuccess]); // eslint-disable-line
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
          setAccountName(() => "P" + (users + 1));
          setPassword(generatedPassword);
          setRepeatPassword(generatedPassword);
          setSecretCode(randomNum);
          window.localStorage.setItem("signupState", JSON.stringify(state));
        })();
    }
  }, [signupState]);

  const isFormValid =
    password.length >= 6 &&
    repeatPassword.length >= 6 &&
    secretCode.length >= 6 &&
    accountName.length >= 2;

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("repeatPassword", repeatPassword);
    formData.append("secretCode", secretCode);
    formData.append("accountName", accountName);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form className="pt-6">
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
        {formState.isError && formState.errors.password && (
          <ErrorText>{formState.errors.password[0]}</ErrorText>
        )}
        <Input
          success={repeatPassword.length >= 6}
          setInput={setRepeatPassword}
          value={repeatPassword}
          type="text"
          name="repeatPassword"
          label="Repeat password"
          placeholder="Repeat password"
        />
        {formState.isError && formState.errors.repeatPassword && (
          <ErrorText>{formState.errors.repeatPassword[0]}</ErrorText>
        )}
        <Input
          success={secretCode.length >= 6}
          value={secretCode}
          setInput={setSecretCode}
          type="text"
          name="secretCode"
          label="Secret code"
          placeholder="Secret code"
        />
        {formState.isError && formState.errors.secretCode && (
          <ErrorText>{formState.errors.secretCode[0]}</ErrorText>
        )}
        <Input
          success={accountName.length >= 2}
          value={accountName}
          setInput={setAccountName}
          type="text"
          name="accountName"
          label="Account name"
          placeholder="Account name"
        />
        {formState.isError && formState.errors.accountName && (
          <ErrorText>{formState.errors.accountName[0]}</ErrorText>
        )}
        <SubmitButton
          onClick={handleSubmit}
          className="flex items-center self-center gap-8 px-6 "
          disabled={!isFormValid || isPending}
        >
          <span></span>
          <span>Next</span>
          <FontAwesomeIcon icon={faArrowRightLong} />
        </SubmitButton>
        {formState.isError && formState.errors.request && (
          <ErrorText>{formState.errors.request[0]}</ErrorText>
        )}
      </div>
    </form>
  );
}
