import { auth } from "@/auth";

export async function getSessionUser() {
  const session = await auth();
  if (!session || !session.user) return null;
  return session.user;
}
