import { IShop } from "./shop";
import { IUser } from "./user";

export type IReview = {
    user: IUser;
    rating: number;
    comment: string;
    productId: string;
    createdAt?: Date;
}

export type IProduct = {
    _id: string;
    name: string;
    description: string;
    category: string;
    tags?: string;
    originalPrice?: number;
    discountPrice?: number;
    size?: string | number;
    stock: number;
    colors: string[];
    brand: string;
    images: {
        public_id: string;
        url: string;
    }[];
    reviews: IReview[];
    ratings?: number;
    shopId: string;
    shop: IShop;
    sold_out?: number;
    createdAt?: Date;
    updatedAt?: Date;
}