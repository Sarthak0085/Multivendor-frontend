import { z } from "zod";

export const addCategory = z.object({
    title: z.string().min(4, { message: "Category is required" })
});

export type addCategoryFormData = z.infer<typeof addCategory>


