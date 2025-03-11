import prisma from "@/lib/prisma";
import paymentSchema from "@/lib/schemas/paymentSchema";
import getSessionFormAuthorizationOrCookie from "@/utils/getSessionFormAuthorizationOrCookie";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFormAuthorizationOrCookie(req);
    if (!session.success || session.data == undefined)
      return Response.json(session);

    const senderUser = await prisma.user.findFirst({
      where: {
        sessions: {
          some: {
            id: session.data.sessionId,
          },
        },
      },
    });
    if (!senderUser)
      return Response.json({
        success: false,
        errors: {
          request: ["Sender user is not found"],
        },
      });
    const body = await req.json();
    const validatedData = paymentSchema.safeParse(body);
    if (!validatedData.success)
      return Response.json({
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
      });
    const { data } = validatedData;
    const asset = await prisma.asset.findUnique({
      where: {
        userId_symbol: {
          userId: senderUser.id,
          symbol: data.paymentMethod,
        },
      },
    });
    if (!asset || asset.quantities < data.amount)
      return Response.json({
        success: false,
        errors: {
          request: ["Balance is not enough"],
        },
      });
    if (senderUser.accountName === data.accountName)
      return Response.json({
        success: false,
        errors: { request: ["You cannot send assets to yourself"] },
      });
    const receiverUser = await prisma.user.findFirst({
      where: {
        accountName: data.accountName,
      },
    });
    if (!receiverUser)
      return Response.json({
        success: false,
        errors: {
          request: ["Receiver user is not found"],
        },
      });
    const receiverAsset = await prisma.asset.findUnique({
      where: {
        userId_symbol: {
          userId: receiverUser.id,
          symbol: data.paymentMethod,
        },
      },
    });
    await prisma.asset.update({
      where: {
        id: asset.id,
      },
      data: {
        quantities: asset.quantities - data.amount,
      },
    });
    await prisma.asset.upsert({
      where: {
        userId_symbol: {
          userId: receiverUser.id,
          symbol: data.paymentMethod,
        },
      },
      create: {
        quantities: 1,
        symbol: data.paymentMethod,
        userId: receiverUser.id,
      },
      update: {
        quantities: (receiverAsset?.quantities || 0) + data.amount,
      },
    });
    const transaction = await prisma.transaction.create({
      data: {
        senderId: senderUser.id,
        receiverId: receiverUser.id,
        symbol: data.paymentMethod,
        quantities: data.amount,
        status: "PAID",
      },
    });
    return Response.json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error(error);
  }
}
