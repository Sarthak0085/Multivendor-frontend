import { z } from "zod";

export const shopRegisterSchema = z.object({
    name: z.string().min(3, { message: "Shop Name must be atleast 3 characters long" })
        .max(20, { message: "Shop Name must not be 20 characters long" }),
    description: z.string().min(60, { message: "Shop description must be atleast 30 characters long" })
        .max(800, { message: "Shop description must not be 800 characters long" }),
    email: z.string().email({ message: "Invalid Email address" }),
    phoneNumber: z.string(),
    address: z.string(),
    pinCode: z.number(),
    password: z.string().min(8, { message: "Password must be atleast 8 characters long" })
        .max(20, { message: "Password must not be 20 characters long" }),
    confirmPassword: z.string().min(8, { message: "Confirm Password must be atleast 8 characters long" })
        .max(20, { message: "Confirm Password must not be 20 characters long" }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
});

export type ShopRegisterFormData = z.infer<typeof shopRegisterSchema>;

// export type ShopRegisterForm  