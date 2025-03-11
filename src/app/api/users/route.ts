import prisma from "@/lib/prisma";
import createUserSchema from "@/lib/schemas/createUserSchema";
import hashPassword from "@/utils/hashPassword";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = createUserSchema.safeParse(body);
    if (!validatedData.success) return Response.json(validatedData);
    const { data } = validatedData;
    data.password = await hashPassword(data.password);
    data.secretCode = await hashPassword(data.secretCode);
    const user = await prisma.user.create({
      data,
      select: {
        id: true,
        accountName: true,
      },
    });
    return Response.json({ success: true, data: user });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.count();
    return Response.json({ success: true, data: users });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}
