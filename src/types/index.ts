import { Transaction, User } from "@prisma/client";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface IErrors {
  [key: string]: string[] | undefined;
}

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
  errors: IErrors;
};

export interface IcreateUserApiResponse {
  success: boolean;
  error?: IErrors;
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
  errors: IErrors;
}

export interface ClaimRewardFormState {
  isError: boolean;
  isSuccess: boolean;
  errors: IErrors;
}

export type AvailableSymbols = "BTC" | "USD" | "EUR" | "XRP" | "ETH" | "LTC";

export interface IPaymentResponse {
  success: boolean;
  data?: Transaction;
  errors?: IErrors;
}

export type TransactionType = Omit<Transaction, "senderId" | "receiverId"> & {
  from: { accountName: string };
  to: { accountName: string };
};

export interface ITransactionsResponse {
  success: boolean;
  data: TransactionType[];
  errors?: IErrors;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  errors: IErrors;
}

export type IGetUserResponse = ApiResponse<User[]>;
