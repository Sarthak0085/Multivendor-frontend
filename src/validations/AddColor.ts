import { z } from "zod";

export const addColor = z.object({
    title: z.string().min(3, { message: "Color is required" })
});

export type addColorFormData = z.infer<typeof addColor>