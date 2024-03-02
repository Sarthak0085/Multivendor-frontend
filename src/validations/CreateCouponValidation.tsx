import { z } from "zod";

export const createCouponSchema = z.object({
    name: z.string().min(10,{message: "Coupon Code must be of 10 characters"}),
    value: z.number().min(5, { message: "Discount Percentage must be greater than or equal to 5" }),
    minAmount: z.number().optional(),
    maxAmount: z.number().optional(),
    selectedProduct: z.string(),
});

export type CreateCouponFormData = z.infer<typeof createCouponSchema>;