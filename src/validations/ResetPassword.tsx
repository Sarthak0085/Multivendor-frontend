import { z } from "zod";

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 chracters long" })
    .max(20, { message: "Password must not be 20 chracters long" }),
});

export type ResetFormData = z.infer<typeof resetPasswordSchema>;
