"use client";

import ErrorText from "@/components/ErrorText";
import SubmitButton from "@/components/SubmitButton";
import { claimRewards } from "@/lib/actions";
import { ClaimRewardFormState } from "@/types";
import { useActionState } from "react";

const initialValue: ClaimRewardFormState = {
  isError: false,
  isSuccess: false,
  errors: {},
};

export default function RewardsForm({ isClaimAble }: { isClaimAble: boolean }) {
  const [state, formAction, isPending] = useActionState(
    claimRewards,
    initialValue
  );
  return (
    <form action={formAction} className="flex flex-col gap-4">
      <SubmitButton disabled={!isClaimAble || isPending}>Claim</SubmitButton>
      {state.isError && state.errors.request && (
        <ErrorText className="text-center text-lg">
          {state.errors.request[0]}
        </ErrorText>
      )}
      {state.isSuccess && (
        <p className="text-xl text-green-500 font-bold text-center">
          YOUR REWARDS WAS CLAIMED !
        </p>
      )}
    </form>
  );
}
