import prisma from "@/lib/prisma";
import envClient from "@/utils/envClient";
import envServer from "@/utils/envServer";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

const DAY_TIMESTAMP = 1000 * 60 * 60 * 24;

export async function POST(req: NextRequest) {
  try {
    const userToken = await getToken({
      req,
      secureCookie: envClient.NEXT_PUBLIC_NODE_ENV === "production",
      secret: envServer.AUTH_SECRET,
    });
    if (!userToken)
      return Response.json({
        success: true,
        errors: {
          request: "Token not provided",
        },
      });
    const rewardedUser = await prisma.user.findFirst({
      where: {
        id: userToken.id,
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
        senderId: envServer.REWARDS_HUB_ID,
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
          request: ["Rewards time is not finished yet"],
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
    const rewardsHubUSDAsset = await prisma.asset.findUnique({
      where: {
        userId_symbol: {
          userId: envServer.REWARDS_HUB_ID,
          symbol: "USD",
        },
      },
    })!;
    if (!rewardsHubUSDAsset || rewardsHubUSDAsset.quantities < 1)
      return Response.json({
        success: false,
        errors: {
          request: ["Rewards quantities was finished"],
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
    await prisma.asset.update({
      where: {
        userId_symbol: {
          userId: envServer.REWARDS_HUB_ID,
          symbol: "USD",
        },
      },
      data: {
        quantities: rewardsHubUSDAsset.quantities - 1,
      },
    });

    const transaction = await prisma.transaction.create({
      data: {
        senderId: envServer.REWARDS_HUB_ID,
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
    const userToken = await getToken({
      req,
      secureCookie: envClient.NEXT_PUBLIC_NODE_ENV === "production",
      secret: envServer.AUTH_SECRET,
    });
    if (!userToken)
      return Response.json({
        success: true,
        errors: {
          request: "Token not provided",
        },
      });
    const rewardedUser = await prisma.user.findFirst({
      where: {
        id: userToken.id,
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
        senderId: envServer.REWARDS_HUB_ID,
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
