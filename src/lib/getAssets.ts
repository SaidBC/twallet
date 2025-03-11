import axios from "axios";
import { cookies } from "next/headers";
import { IassetsResponse } from "@/types";

export default async function getAssets() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  const res = await axios.get<IassetsResponse>(
    "http://localhost:3000/api/me/assets",
    {
      headers: {
        Authorization: "Bearer " + session,
      },
    }
  );
  const data = res.data;
  if (!data.success) return null;

  return data.data;
}
