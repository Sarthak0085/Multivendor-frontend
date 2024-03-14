import { z } from "zod";

export const productSchema = z.object({
    // shopId: z.string(),
    name: z.string().min(3, { message: "Product Name is Required" }),
    description: z.string().min(3, { message: "Product description is required" }),
    category: z.string().min(1, { message: "Category is Required." }),
    tags: z.string().optional(),
    originalPrice: z.number().positive({ message: "Price must be a positive value" }),
    discountPrice: z.number().positive({ message: "Price must be a positive value" }),
    gender: z.string().min(1, { message: "Gender is Required" }),
    stock: z.number().positive({ message: "Stock must be positive and greater than 0" }),
    colors: z.array(z.string()),
    brand: z.string().min(2, { message: "Brand is required" }),
    sizes: z.array(z.string()),
    // images: z.array(z.string().url()),
});

export type CreateProductData = z.infer<typeof productSchema>