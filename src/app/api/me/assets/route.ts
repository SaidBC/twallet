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
