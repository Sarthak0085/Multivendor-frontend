import { z } from "zod";

export const productSchema = z.object({
    // shopId: z.string(),
    name: z.string().nonempty("Product Name is required"),
    description: z.string().nonempty("Product description is required"),
    category: z.string().nonempty("Category is required"),
    tags: z.string().optional(),
    originalPrice: z.number().positive({ message: "Price must be a positive value" }),
    discountPrice: z.number().positive({ message: "Price must be a positive value" }),
    stock: z.number().positive({ message: "Stock must be positive and greater than 0" }),
    colors: z.string().nonempty("Colors are required"),
    brand: z.string(),
    // images: z.array(z.string().url()),
});

export type CreateProductData = z.infer<typeof productSchema>