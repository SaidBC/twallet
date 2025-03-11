"use client";
import ErrorText from "@/components/ErrorText";
import Input from "@/components/Inputs/Input";
import SubmitButton from "@/components/SubmitButton";
import { signInWithCredentials } from "@/lib/actions";
import { AuthFormState } from "@/types";
import { redirect } from "next/navigation";
import {
  MouseEventHandler,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";

const initialState: AuthFormState = {
  isSuccess: false,
  isError: false,
  errors: {},
};

export default function LoginForm() {
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [state, formAction, isPending] = useActionState(
    signInWithCredentials,
    initialState
  );
  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("accountName", accountName);
    formData.append("password", password);
    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (state?.isSuccess) redirect("/");
  }, [state?.isSuccess]);

  const isFormValid = accountName.length >= 2 && password.length >= 6;
  return (
    <form>
      <div className="flex flex-col gap-4">
        <Input
          setInput={setAccountName}
          value={accountName}
          success={accountName.length >= 2}
          label="Login"
          placeholder="P100000"
          type="text"
          name="account_name"
        />
        {state.isError && state.errors.accountName && (
          <ErrorText>{state.errors.accountName[0]}</ErrorText>
        )}
        <Input
          setInput={setPassword}
          value={password}
          success={password.length >= 6}
          type="password"
          label="Password"
          name="password"
        />
        {state.isError && state.errors.password && (
          <ErrorText>{state.errors.password[0]}</ErrorText>
        )}
        <SubmitButton
          onClick={handleSubmit}
          disabled={!isFormValid || isPending}
        >
          Login
        </SubmitButton>
        {state.isError && state.errors.credentials && (
          <ErrorText>{state.errors.credentials[0]}</ErrorText>
        )}
      </div>
    </form>
  );
}
