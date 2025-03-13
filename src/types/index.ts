import { Transaction, User } from "@prisma/client";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface IsignupState {
  miniStep: number;
  currentStep: number;
  user: {
    email?: string;
    password?: string;
    secretCode?: string;
    accountName?: string;
  };
}

export type SubmitButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type AuthFormState = {
  isSuccess: boolean;
  isError: boolean;
  errors: {
    email?: string[];
    password?: string[];
    secretCode?: string[];
    accountName?: string[];
    credentials?: string[];
  };
};

export interface IcreateUserApiResponse {
  success: boolean;
  error?: any;
  data?: Pick<User, "accountName" | "id">;
}

export interface SessionPayload {
  sessionId: string;
  expiresAt: Date;
}

export interface Asset {
  symbol: string;
  name: string;
  quantities: number;
}
export interface IassetsResponse {
  success: boolean;
  data: Asset[];
}

export interface PaymentFormState {
  isSuccess: boolean;
  isError: boolean;
  errors: {
    amount?: string[];
    accountName?: string[];
    paymentMethod?: string[];
    request?: string[];
  };
}

export interface ClaimRewardFormState {
  isError: boolean;
  isSuccess: boolean;
  errors: {
    request?: string[];
  };
}

export type AvailableSymbols = "BTC" | "USD" | "EUR" | "XRP" | "ETH" | "LTC";

export interface IPaymentResponse {
  success: boolean;
  data?: any;
  errors?: {
    request: string[];
  };
}

export type TransactionType = Omit<Transaction, "senderId" | "receiverId"> & {
  from: { accountName: string };
  to: { accountName: string };
};

export interface ITransactionsResponse {
  success: boolean;
  data: TransactionType[];
  errors?: {
    request: string[];
  };
}
