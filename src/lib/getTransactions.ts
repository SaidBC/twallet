import { Transaction } from "@prisma/client";
import axios from "axios";
import { cookies } from "next/headers";

interface ITransactionsResponse {
  success: boolean;
  data: Transaction[];
  errors?: {
    request: string[];
  };
}

export default async function getTransactions() {
  const session = (await cookies()).get("session")?.value;
  if (!session)
    return {
      request: ["Session is not provided"],
    };
  const res = await axios.get<ITransactionsResponse>(
    "http://localhost:3000/api/me/transactions",
    {
      headers: {
        Authorization: "Bearer " + session,
      },
    }
  );
  if (!res.data.success && res.data.errors) return res.data.errors;
  return res.data.data;
}
