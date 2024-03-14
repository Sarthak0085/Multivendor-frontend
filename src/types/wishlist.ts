import { IProduct } from "./product";

export type IProductInWishlist = {
    gender: any;
    productId?: string;
    shopId: string;
    addedAt: Date;
    product: IProduct;
    color: string;
    price: number;
    size: string;
}

export type IWishlist = {
    products: IProductInWishlist[];
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}