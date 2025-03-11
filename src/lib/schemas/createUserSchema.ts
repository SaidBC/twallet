import { z } from "zod";

const createUserSchema = z.object({
  accountName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  secretCode: z.string(),
  country: z.string(),
});

export default createUserSchema;
