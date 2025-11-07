import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(1, "Wrong format"),

  email: z.email("Wrong format"),
  phone: z.string().min(11, "Wrong format"),
  address: z.string().min(1, "Wrong format"),
  zip: z.string().min(1, "Wrong format"),
  city: z.string().min(1, "Wrong format"),
  country: z.string().min(1, "Wrong format"),
  paymentMethod: z.enum(["e-money", "cod"]),
  eMoneyNumber: z.string().optional(),
  eMoneyPin: z.string().optional(),
});

export type CheckoutForm = z.infer<typeof checkoutSchema>;
