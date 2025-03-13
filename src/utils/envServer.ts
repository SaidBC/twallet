import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  REWARDS_HUB_ID: z.string(),
});

export default envSchema.parse(process.env);
