"use client";

import Input from "@/components/Inputs/Input";
import SubmitButton from "@/components/SubmitButton";
import {
  MouseEventHandler,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import SelectPayments from "@/components/SelectPayments";
import AvailableAssets from "./AvailableAssets";
import axios from "axios";
import { Asset, IassetsResponse, PaymentFormState } from "@/types";
import { sendPayment } from "@/lib/actions";
import ErrorText from "@/components/ErrorText";
import envClient from "@/utils/envClient";

const initiialState: PaymentFormState = {
  isError: false,
  isSuccess: false,
  errors: {},
};

export default function TransferForm() {
  const [state, formAction, isPending] = useActionState(
    sendPayment,
    initiialState
  );
  const [assets, setAssets] = useState<Asset[]>([]);
  const [payment, setPayment] = useState("USD");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState(0);
  const handleSubmit: MouseEventHandler<HTMLButtonElement> = function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("paymentMethod", payment);
    formData.append("amount", amount.toString());
    formData.append("accountName", accountName);
    formData.append("paymentMethod", payment);
    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    (async function () {
      const res = await axios.get<IassetsResponse>(
        envClient.NEXT_PUBLIC_API_URL + "/me/assets",
        {
          withCredentials: true,
        }
      );
      if (res.data.success) setAssets(res.data.data);
    })();
  }, []);
  return (
    <form action="" className="flex flex-col gap-4">
      <SelectPayments
        label="Payments method"
        setInput={setPayment}
        value={payment}
      />
      {state.isError && state.errors.paymentMethod && (
        <ErrorText>{state.errors.paymentMethod[0]}</ErrorText>
      )}
      <AvailableAssets assets={assets} symbol={payment} />
      <Input
        setInput={setAccountName}
        success={false}
        label="Account"
        placeholder="P123456"
        value={accountName}
      />
      {state.isError && state.errors.accountName && (
        <ErrorText>{state.errors.accountName[0]}</ErrorText>
      )}
      <Input
        type="number"
        setInput={setAmount}
        success={false}
        label="Amount"
        placeholder="0.00"
        value={amount}
      />
      {state.isError && state.errors.amount && (
        <ErrorText>{state.errors.amount[0]}</ErrorText>
      )}
      <Input
        type="number"
        setInput={setAmount}
        success={false}
        label="Total"
        placeholder="0.00"
        value={amount}
      />
      <SubmitButton onClick={handleSubmit} disabled={isPending}>
        SEND
      </SubmitButton>
      {state.isError && state.errors.request && (
        <ErrorText>{state.errors.request[0]}</ErrorText>
      )}
      {state.isSuccess && (
        <p className="text-xl text-green-500 font-bold text-center">
          Payment was successfully sent !
        </p>
      )}
    </form>
  );
}
