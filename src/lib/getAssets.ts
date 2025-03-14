import axios from "axios";
import { headers } from "next/headers";
import { IassetsResponse } from "@/types";
import { getToken } from "next-auth/jwt";
import envClient from "@/utils/envClient";

export default async function getAssets() {
  try {
    const token = await getToken({
      raw: true,
      req: {
        headers: await headers(),
      },
    });
    if (!token) return null;
    const res = await axios.get<IassetsResponse>(
      envClient.NEXT_PUBLIC_API_URL + "/me/assets",
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    console.log(res);
    const data = res.data;
    if (!data.success) return null;

    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
