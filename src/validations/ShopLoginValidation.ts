import { z } from "zod";

export const shopLoginSchema = z.object({
    email: z.string().email({ message: "Invalid Shop Email address" }),
    password: z.string().min(8, { message: "Password must be atleast 8 chracters long" })
        .max(20, { message: "Password must not be 20 chracters long" }),
});

export type ShopLoginFormData = z.infer<typeof shopLoginSchema>;