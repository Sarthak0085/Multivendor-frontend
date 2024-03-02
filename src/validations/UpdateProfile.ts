import { z } from "zod";

export const updateProfileSchema = z.object({
    fullName: z.string().min(3, { message: "FullName must be atleast 3 chracters long" })
        .max(20, { message: "FullName must not be 20 chracters long" }),
    email: z.string().email({ message: "Invalid Email address" }),
    phoneNumber: z.string().min(5, "Please enter a valid phone number"),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
