import { decrypt } from "@/lib/sessions";
import { NextRequest } from "next/server";

export default async function getSessionFormAuthorizationOrCookie(
  req: NextRequest
) {
  const authorization = req.headers.get("authorization");
  const cookie = req.headers.get("cookie");
  if (authorization === null && cookie == null)
    return {
      success: false,
      error: {
        message: "Authorization header or session cookies not provided",
      },
    };
  const session =
    authorization?.split(" ")[1] ||
    Object.fromEntries(new URLSearchParams(cookie?.replace(/; /g, "&")))
      .session;

  const decodedSession = await decrypt(session);
  if (!decodedSession)
    return {
      success: false,
      error: {
        message: "Something went wrong when decrypting",
      },
    };
  return {
    success: true,
    data: decodedSession,
  };
}
