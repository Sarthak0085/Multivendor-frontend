import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid Email address" }),
});

export type ForgotPasswordDataType = z.infer<typeof forgotPasswordSchema>;
