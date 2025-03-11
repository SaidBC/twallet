"use client";
import SelectPayments from "@/components/SelectPayments";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";

export default function TransferForm() {
  const [payment, setPayment] = useState("USD");
  return (
    <form action="" className="flex flex-col gap-4 justify-center">
      <SelectPayments
        setInput={setPayment}
        value={payment}
        label="Deposit Method"
      />
      <SubmitButton disabled={true}>NEXT</SubmitButton>
    </form>
  );
}
