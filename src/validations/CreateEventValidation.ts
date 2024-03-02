import { z } from "zod";

export const productSchema = z.object({
    shopId: z.string(),
    name: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.string(),
    originalPrice: z.number().positive({ message: "Price must be a positive value" }),
    discountPrice: z.number().positive({ message: "Price must be a positive value" }),
    stock: z.number().positive({ message: "Stock must be positive and greater than 0" }),
    colors: z.array(z.string()),
    brand: z.string(),
    images: z.array(z.string()),
    startDate: z.date(),
    endDate: z.date(),
});

export type CreateProductData = z.infer<typeof productSchema>