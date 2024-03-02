import { IShop } from "./shop";

export type IEvent = {
    _id: string;
    name: string;
    description: string;
    colors: string[];
    category: string;
    start_Date: Date;
    finish_Date: Date;
    status: string;
    brand: string;
    tags?: string;
    originalPrice?: number;
    discountPrice: number;
    stock: number;
    images: Array<{
        public_id: string;
        url: string;
    }>;
    shopId: string;
    shop: IShop;
    sold_out: number;
}