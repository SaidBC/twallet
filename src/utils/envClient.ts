import { z } from "zod";
console.log(
  process.env.NEXT_PUBLIC_API_URL,
  process.env.NEXT_PUBLIC_BINANCE_URL
);
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_BINANCE_URL: z.string().url(),
});

export default envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_BINANCE_URL: process.env.NEXT_PUBLIC_BINANCE_URL,
});
