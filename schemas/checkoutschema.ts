import { z } from "zod";

export const checkoutSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email"),
  phone: z.string().min(11, "Invalid phone number"),
  address: z.string().min(1, "Address is required"),
  zip: z.string().min(1, "ZIP required"),
  city: z.string().min(1, "City required"),
  country: z.string().min(1, "Country required"),
  paymentMethod: z.enum(["e-money", "cod"]),
  eMoneyNumber: z.string().optional(),
  eMoneyPin: z.string().optional(),
});

export type CheckoutForm = z.infer<typeof checkoutSchema>;
