import { z } from "zod";

export const addBrand = z.object({
    title: z.string().min(4, { message: "Brand is required" })
});

export type addBrandFormData = z.infer<typeof addBrand>