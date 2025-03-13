import { ITransactionsResponse } from "@/types";
import { Transaction } from "@prisma/client";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";

export default async function getTransactions() {
  const token = await getToken({
    raw: true,
    req: {
      headers: await headers(),
    },
  });
  if (!token)
    return {
      request: ["Token is not provided"],
    };
  const res = await axios.get<ITransactionsResponse>(
    "http://localhost:3000/api/me/transactions",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  if (!res.data.success && res.data.errors) return res.data.errors;
  return res.data.data;
}
