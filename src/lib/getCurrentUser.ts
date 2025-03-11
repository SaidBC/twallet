import { cookies } from "next/headers";

export default async function getCurrentUser() {
  const currentUser = (await cookies()).get("user")?.value;
  return currentUser ? JSON.parse(currentUser) : null;
}
