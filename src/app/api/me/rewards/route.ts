import prisma from "@/lib/prisma";
import getSessionFormAuthorizationOrCookie from "@/utils/getSessionFormAuthorizationOrCookie";
import { NextRequest } from "next/server";

const DAY_TIMESTAMP = 1000 * 60 * 60 * 24;

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFormAuthorizationOrCookie(req);
    if (!session.success || session.data == undefined)
      return Response.json(session);
    const rewardedUser = await prisma.user.findFirst({
      where: {
        sessions: {
          some: {
            id: session.data.sessionId,
          },
        },
      },
    });
    if (!rewardedUser)
      return Response.json({
        success: false,
        errors: {
          request: ["rewarded user is not found"],
        },
      });
    const lastTransaction = await prisma.transaction.findFirst({
      where: {
        senderId: 1,
        receiverId: rewardedUser.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    if (
      lastTransaction &&
      lastTransaction.createdAt.getTime() + DAY_TIMESTAMP > Date.now()
    ) {
      return Response.json({
        success: false,
        errors: {
          request: ["rewarde time is not finished yet"],
        },
      });
    }
    const assets = await prisma.asset.findUnique({
      where: {
        userId_symbol: {
          userId: rewardedUser.id,
          symbol: "USD",
        },
      },
    });
    await prisma.asset.upsert({
      where: {
        userId_symbol: {
          userId: rewardedUser.id,
          symbol: "USD",
        },
      },
      create: {
        quantities: 1,
        symbol: "USD",
        userId: rewardedUser.id,
      },
      update: {
        quantities: (assets?.quantities || 0) + 1,
      },
    });
    const transaction = await prisma.transaction.create({
      data: {
        senderId: 1,
        receiverId: rewardedUser.id,
        symbol: "USD",
        quantities: 1,
        status: "PAID",
      },
    });
    return Response.json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      success: false,
      error,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFormAuthorizationOrCookie(req);
    if (!session.success || session.data == undefined)
      return Response.json(session);
    const rewardedUser = await prisma.user.findFirst({
      where: {
        sessions: {
          some: {
            id: session.data.sessionId,
          },
        },
      },
    });
    if (!rewardedUser)
      return Response.json({
        success: false,
        errors: {
          request: ["rewarded user is not found"],
        },
      });

    const transaction = await prisma.transaction.findFirst({
      where: {
        senderId: 1,
        receiverId: rewardedUser.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    if (!transaction)
      return Response.json({
        success: true,
        data: null,
      });
    return Response.json({
      success: true,
      data: new Date(transaction.createdAt.getTime() + DAY_TIMESTAMP),
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      success: false,
      error,
    });
  }
}
