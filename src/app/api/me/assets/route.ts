import prisma from "@/lib/prisma";
import getSessionFormAuthorizationOrCookie from "@/utils/getSessionFormAuthorizationOrCookie";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFormAuthorizationOrCookie(req);
    if (!session.success || session.data == undefined)
      return Response.json(session);
    const user = await prisma.user.findFirst({
      where: {
        sessions: {
          some: {
            id: session.data.sessionId,
          },
        },
      },
      select: {
        assets: true,
      },
    });
    if (!user)
      return Response.json({
        success: false,
        error: {
          message: "User with provided session not found",
        },
      });
    const assets = user.assets;
    return Response.json({ success: true, data: assets });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error });
  }
}
