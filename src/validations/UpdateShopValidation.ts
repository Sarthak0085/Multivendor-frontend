import { z } from "zod";

export const updateShopInfoSchema = z.object({
    name: z.string().min(3, { message: "Shop Name must be atleast 3 characters long" })
        .max(20, { message: "Shop Name must not be 20 characters long" }),
    description: z.string().min(60, { message: "Shop description must be atleast 30 characters long" })
        .max(800, { message: "Shop description must not be 800 characters long" }),
    email: z.string().email({ message: "Invalid Email address" }),
    phoneNumber: z.string(),
    address: z.string(),
    pinCode: z.number(),
});

export type UpdateShopFormData = z.infer<typeof updateShopInfoSchema>;