import axios from "axios";
import { headers } from "next/headers";
import { IassetsResponse } from "@/types";
import { getToken } from "next-auth/jwt";

export default async function getAssets() {
  const token = await getToken({
    raw: true,
    req: {
      headers: await headers(),
    },
  });
  if (!token) return null;
  const res = await axios.get<IassetsResponse>(
    "http://localhost:3000/api/me/assets",
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
  const data = res.data;
  if (!data.success) return null;

  return data.data;
}
