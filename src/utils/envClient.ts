import { z } from "zod";

const NODE_ENV = ["development", "production"] as const;

const envSchema = z.object({
  NEXT_NODE_ENV: z.enum(NODE_ENV),
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_BINANCE_URL: z.string().url(),
});

export default envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_BINANCE_URL: process.env.NEXT_PUBLIC_BINANCE_URL,
});
