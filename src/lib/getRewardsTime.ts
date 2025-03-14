import envClient from "@/utils/envClient";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";
interface IRewardsTimeResponse {
  success: boolean;
  data?: null | string;
  error?: {
    request: string[];
  };
}

type getRewardsTimeType =
  | {
      message: string;
    }
  | null
  | Date;

export default async function getRewardsTime(): Promise<getRewardsTimeType> {
  try {
    const token = await getToken({
      secureCookie: envClient.NEXT_NODE_ENV === "production",
      raw: true,
      req: {
        headers: await headers(),
      },
    });
    if (!token)
      return {
        message: "token is not provided",
      };
    const res = await axios.get<IRewardsTimeResponse>(
      envClient.NEXT_PUBLIC_API_URL + "/me/rewards",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (!res.data.success || res.data.data === undefined)
      return {
        message: "an error is occurs",
      };
    return typeof res.data.data === "string" ? new Date(res.data.data) : null;
  } catch (error) {
    return null;
  }
}
