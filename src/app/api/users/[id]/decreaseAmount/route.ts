import prisma from "@/lib/prisma";
import increaseAndDecreaseSchema from "@/lib/schemas/increaseAndDecreaseSchema";
import getSessionFormAuthorizationOrCookie from "@/utils/getSessionFormAuthorizationOrCookie";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFormAuthorizationOrCookie(req);
    if (!session.success || session.data == undefined)
      return Response.json(session);
    const admin = await prisma.user.findFirst({
      where: {
        sessions: {
          some: {
            id: session.data.sessionId,
          },
        },
      },
    });
    if (!admin)
      return Response.json({
        success: false,
        errors: {
          request: ["Admin with provided session is not found"],
        },
      });
    if (admin.role !== "ADMIN")
      return Response.json({
        success: false,
        errors: {
          request: ["Only admin can decrease or increase amount"],
        },
      });
    const body = await req.json();
    const validatedData = increaseAndDecreaseSchema.safeParse(body);
    if (!validatedData.success)
      return Response.json({
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
      });
    const { data } = validatedData;
    const { id } = await params;
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        assets: {
          where: {
            symbol: data.symbol,
          },
        },
      },
    });
    if (!user)
      return Response.json({
        success: false,
        errors: {
          request: ["User with provided id is not found"],
        },
      });
    await prisma.asset.upsert({
      where: {
        userId_symbol: {
          userId: Number(id),
          symbol: data.symbol,
        },
      },
      create: {
        userId: Number(id),
        symbol: data.symbol,
        quantities: 0,
      },
      update: {
        quantities: (user.assets[0].quantities || 0) - data.amount,
      },
    });
    return Response.json({ success: true, data: null });
  } catch (error) {
    return Response.json({ success: true, errors: error });
  }
}
