import { z } from "zod";

export const addressSchema = z.object({
    country: z.string().min(2, "Country Name must be greater than 2"),
    state: z.string().min(2, "State Name must be greater than 2"),
    city: z.string().min(2, "City Name must be greater than 2"),
    address1: z.string().min(5, "Address must be greater than 5"),
    address2: z.string().min(5, "Address must be greater than 5"),
    pinCode: z.number().min(3, "Please enter a valid Pincode."),
    addressType: z.string().min(2, "Please choose a valid address type."),
});

export type AddressFormData = z.infer<typeof addressSchema>