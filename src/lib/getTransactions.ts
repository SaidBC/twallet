import { ITransactionsResponse } from "@/types";
import envClient from "@/utils/envClient";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";

export default async function getTransactions() {
  const token = await getToken({
    secureCookie: envClient.NEXT_PUBLIC_NODE_ENV === "production",
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
    envClient.NEXT_PUBLIC_API_URL + "/me/transactions",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  if (!res.data.success && res.data.errors) return res.data.errors;
  return res.data.data;
}
