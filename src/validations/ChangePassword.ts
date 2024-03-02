import { z } from "zod";

export const changePasswordSchema = z.object({
    oldPassword: z.string().min(8, { message: "Old Password must be atleast 8 chracters long" })
        .max(20, { message: "Old Password must not be 20 characters long" }),
    newPassword: z.string().min(8, { message: "New Password must be atleast 8 chracters long" })
        .max(20, { message: "New Password must not be 20 characters long" }),
    confirmPassword: z.string().min(8, { message: "Confirm Password must be atleast 8 chracters long" })
        .max(20, { message: "Confirm Password must not be 20 characters long" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;