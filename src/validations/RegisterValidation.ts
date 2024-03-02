import { z } from "zod";

export const registerSchema = z.object({
    fullName: z.string().min(3, { message: "FullName must be atleast 3 chracters long" })
        .max(20, { message: "FullName must not be 20 chracters long" }),
    email: z.string().email({ message: "Invalid Email address" }),
    password: z.string().min(8, { message: "Password must be atleast 8 chracters long" })
        .max(20, { message: "Password must not be 20 chracters long" }),
    confirmPassword: z.string().min(8, { message: "Confirm Password must be atleast 8 chracters long" })
        .max(20, { message: "Confirm Password must not be 20 chracters long" }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
});

export type RegisterFormData = z.infer<typeof registerSchema>;
