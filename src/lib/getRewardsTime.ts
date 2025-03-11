import axios from "axios";
import { cookies } from "next/headers";
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
  const session = (await cookies()).get("session")?.value;
  if (!session)
    return {
      message: "session is not provided",
    };
  const res = await axios.get<IRewardsTimeResponse>(
    "http://localhost:3000/api/me/rewards",
    {
      headers: {
        Authorization: "Bearer " + session,
      },
    }
  );
  if (!res.data.success || res.data.data === undefined)
    return {
      message: "an error is occurs",
    };
  return typeof res.data.data === "string" ? new Date(res.data.data) : null;
}
