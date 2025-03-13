import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userToken = await getToken({ req, secret: "ANY SECRET" });
    if (!userToken)
      return Response.json({
        success: true,
        errors: {
          request: "Token not provided",
        },
      });

    const user = await prisma.user.findFirst({
      where: {
        id: userToken.id,
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
      select: {
        id: true,
        symbol: true,
        quantities: true,
        status: true,
        createdAt: true,
        from: {
          select: {
            accountName: true,
          },
        },
        to: {
          select: {
            accountName: true,
          },
        },
      },
    });
    return Response.json({ success: true, data: transactions });
  } catch (error) {
    return Response.json({ success: false, errors: error });
  }
}
