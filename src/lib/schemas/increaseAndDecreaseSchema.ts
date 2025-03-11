import { z } from "zod";

const increaseAndDecreaseSchema = z.object({
  amount: z.number(),
  symbol: z.string(),
});

export default increaseAndDecreaseSchema;
