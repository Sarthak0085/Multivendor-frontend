import { IProduct } from "./product";
import { IUser } from "./user";

export type IPaymentInfo = {
    _id: string;
    type: string;
    status: string;
}

export type IOrder = {
    _id: string;
    cart: [];
    shippingAddress: object;
    product: IProduct;
    user: IUser;
    totalPrice: number;
    status: "Processing" | "Refund Success" | "Transferred to delivery partner" | "Received" | "Delivered" | "On the way" | "Shipping" | "Processing Refund";
    paymentInfo: IPaymentInfo;
    paidAt: Date;
    deliveredAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}