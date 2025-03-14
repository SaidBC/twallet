import { IGetUserResponse } from "@/types";
import envClient from "@/utils/envClient";
import axios from "axios";

export default async function getUserByEmail(email: string) {
  try {
    const res = await axios.get<IGetUserResponse>(
      envClient.NEXT_PUBLIC_API_URL + "/users?email=" + email
    );
    if (!res.data.success) return null;
    const users = res.data.data;
    return users.length === 0 ? null : users;
  } catch (err) {
    console.error(err);
    return null;
  }
}
