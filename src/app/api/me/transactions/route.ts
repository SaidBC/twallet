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
    });
    if (!user)
      return Response.json({
        success: false,
        errors: {
          request: ["User with provided session not found"],
        },
      });
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            senderId: user.id,
          },
          {
            receiverId: user.id,
          },
        ],
      },
    });
    return Response.json({ success: true, data: transactions });
  } catch (error) {
    return Response.json({ success: false, errors: error });
  }
}
