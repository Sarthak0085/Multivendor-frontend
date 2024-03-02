import { z } from "zod";

export const addPaymentSchema = z.object({
    bankName: z.string().min(2, "Bank Name is required"),
    bankCountry: z.string().min(2, "Bank Country is required"),
    bankSwiftCode: z.string().min(2, "Bank Swift Code is required"),
    bankAccountNumber: z.string().min(4, "Bank Account Number is required"),
    bankHolderName: z.string().min(2, "Bank Holder Name is required"),
    bankAddress: z.string().min(2, "Bank Address is required"),
})

export type addPaymentFormData = z.infer<typeof addPaymentSchema>