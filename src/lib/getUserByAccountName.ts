import { IGetUserResponse } from "@/types";
import envClient from "@/utils/envClient";
import axios from "axios";

export default async function getUserByAccountName(accountName: string) {
  try {
    const res = await axios.get<IGetUserResponse>(
      envClient.NEXT_PUBLIC_API_URL + "/users?accountName=" + accountName
    );
    if (!res.data.success) return null;
    const users = res.data.data;
    return users.length === 0 ? null : users;
  } catch (_) {
    return null;
  }
}
