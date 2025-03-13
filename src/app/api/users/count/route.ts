import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.count();
    return Response.json({ success: true, data: users });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}
