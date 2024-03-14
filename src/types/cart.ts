import { IProduct } from "./product";

export interface IProductInCart {
    productId: string;
    shopId: string;
    color: string;
    count: number;
    size: string;
    price: number;
    product: IProduct;
    gender?: string;
}

// Define the interface for the cart document
export type ICart = {
    _id: string;
    products: IProductInCart[];
    cartTotal: number;
    addedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
}