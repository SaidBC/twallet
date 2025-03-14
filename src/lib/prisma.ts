import envServer from "@/utils/envServer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: envServer.DATABASE_URL,
    },
  },
});

export default prisma;
