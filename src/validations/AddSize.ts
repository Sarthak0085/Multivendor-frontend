import { z } from "zod";

export const addSize = z.object({
    title: z.string().min(2, { message: "Size is required" }),
    symbol: z.string().min(1, { message: "Size Symbol is required" }),
});

export type addSizeFormData = z.infer<typeof addSize>