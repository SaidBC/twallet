import { z } from "zod";

const paymentsMethods = ["USD", "EUR", "BTC", "ETH", "LTC", "XRP"] as const;

const paymentSchema = z.object({
  paymentMethod: z.enum(paymentsMethods),
  accountName: z.string().min(2),
  amount: z.coerce.number().gt(0),
});

export default paymentSchema;
