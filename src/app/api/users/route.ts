import prisma from "@/lib/prisma";
import createUserSchema from "@/lib/schemas/createUserSchema";
import hashPassword from "@/utils/hashPassword";
import { Prisma } from "@prisma/client";
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

type UserColumns = [
  "id",
  "accountName",
  "email",
  "emailVerified",
  "firstName",
  "lastName",
  "country",
  "secretCode",
  "password",
  "role",
  "createdAt",
  "updatedAt"
];

export async function GET(req: NextRequest) {
  try {
    const queries = new URL(req.url).searchParams;
    const columns: UserColumns = [
      "id",
      "accountName",
      "email",
      "emailVerified",
      "firstName",
      "lastName",
      "country",
      "secretCode",
      "password",
      "role",
      "createdAt",
      "updatedAt",
    ];
    const where: Prisma.UserWhereInput = {};
    Array.from(queries).forEach((q) => {
      const input = q[0];
      const item = columns.find((c) => c === input);
      if (!item) return;
      where[item] = q[1];
    });
    const users = await prisma.user.findMany({ where });
    return Response.json({ success: true, data: users });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}
