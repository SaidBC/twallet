import envClient from "@/utils/envClient";
import axios from "axios";

axios.defaults.baseURL = envClient.NEXT_PUBLIC_API_URL;

interface ResponseData {
  success: boolean;
  data: number;
}

export default async function getLastUser() {
  const res = await axios.get<ResponseData>("/users/count");
  return res.data.data;
}
