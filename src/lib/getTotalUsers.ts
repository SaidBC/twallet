import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/";

interface ResponseData {
  success: boolean;
  data: number;
}

export default async function getLastUser() {
  const res = await axios.get<ResponseData>("/users");
  return res.data.data;
}
