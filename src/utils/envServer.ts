import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().refine(
    (val) => {
      console.log(val);
      return val.startsWith("postgresql://") || val.startsWith("postgres://");
    },
    {
      message: 'String must start with "postgresql://" or "postgres://"',
    }
  ),
  REWARDS_HUB_ID: z.string(),
});

export default envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  REWARDS_HUB_ID: process.env.DATABASE_URL,
});
