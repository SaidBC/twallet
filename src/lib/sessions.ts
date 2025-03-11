import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import prisma from "./prisma";
import { SessionPayload } from "@/types";

const secretKey = "lamdlkdma";
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload & SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify<JWTPayload & SessionPayload>(
      session,
      encodedKey,
      {
        algorithms: ["HS256"],
      }
    );
    return payload;
  } catch (error) {
    console.error(error);
  }
}

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const data = await prisma.session.create({
    data: {
      userId: userId,
      expires: expiresAt,
    },
  });

  const sessionId = data.id;
  const session = await encrypt({ sessionId, expiresAt });
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
    secure: false,
  });
}

export async function getSession() {
  try {
    const cookie = (await cookies()).get("session")?.value;
    if (cookie === undefined) return null;
    const session = await decrypt(cookie);
    return session;
  } catch (error) {
    console.error(error);
  }
}

export async function getSessionUser() {
  try {
    const session = await getSession();
    if (!session) return null;
    const user = await prisma.user.findFirst({
      where: {
        sessions: {
          some: {
            id: session.sessionId,
          },
        },
      },
      select: {
        id: true,
        accountName: true,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteSession() {
  return (await cookies()).delete("session");
}
