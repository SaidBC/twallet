import { z } from "zod";

const loginSchema = z.object({
  accountName: z.string(),
  password: z.string(),
});

export default loginSchema;
