import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .refine(
      (val) => val.startsWith("postgresql://") || val.startsWith("postgres://"),
      {
        message: 'String must start with "postgresql://" or "postgres://"',
      }
    ),
  REWARDS_HUB_ID: z.string(),
  AUTH_SECRET: z.string(),
});

export default envSchema.parse(process.env);
