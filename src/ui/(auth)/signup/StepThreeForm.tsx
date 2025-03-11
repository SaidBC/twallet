"use client";
import Input from "@/components/Inputs/Input";
import SubmitButton from "@/components/SubmitButton";
import { signUpWithCredentials } from "@/lib/actions";
import { AuthFormState, IsignupState } from "@/types";
import getLocalStorageItem from "@/utils/getLocalStorageItem";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

export default function StepThreeForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [state, formAction] = useActionState(
    signUpWithCredentials,
    initialState
  );
  const isFormValid =
    firstName.length >= 1 && lastName.length >= 1 && country.length >= 1;
  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async function (
    e
  ) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("country", country);
    const signupState: IsignupState | null = getLocalStorageItem("signupState");
    if (
      signupState !== null &&
      signupState.user.email &&
      signupState.user.accountName &&
      signupState.user.password &&
      signupState.user.secretCode
    ) {
      formData.append("email", signupState.user.email);
      formData.append("accountName", signupState.user.accountName);
      formData.append("password", signupState.user.password);
      formData.append("secretCode", signupState.user.secretCode);
      startTransition(() => {
        formAction(formData);
      });
      window.localStorage.removeItem("signupState");
    }
  };
  useEffect(() => {
    if (state?.isSuccess) redirect("/");
  }, [state?.isSuccess]);

  return (
    <form className="pt-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl max-w-sm self-center text-center">
          Congratulation! To complete please enter your name and country
        </h1>
        <Input
          value={firstName}
          success={firstName.length >= 1}
          setInput={setFirstName}
          type="text"
          name="firstName"
          label="Name"
          placeholder="Name"
        />
        <Input
          value={lastName}
          success={lastName.length >= 1}
          setInput={setLastName}
          type="text"
          name="lastName"
          label="Last name"
          placeholder="Last name"
        />
        <Input
          value={country}
          success={country.length >= 1}
          setInput={setCountry}
          type="text"
          name="country"
          label="Country"
          placeholder="Country"
        />
        <SubmitButton
          className="flex items-center self-center gap-8 px-6 "
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          <span></span>
          <span>Done</span>
          <FontAwesomeIcon icon={faArrowRightLong} />
        </SubmitButton>
      </div>
    </form>
  );
}
