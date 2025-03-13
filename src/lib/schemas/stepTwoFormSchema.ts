import { z } from "zod";

const stepTwoFormSchama = z.object({
  password: z.string().min(6),
  repeatPassword: z.string().min(6),
  secretCode: z.coerce.number(),
  accountName: z.string().min(2),
});

export default stepTwoFormSchama;
