export type ICoupon = {
    _id: string;
    name: string;
    value: number;
    minAmount?: number;
    maxAmount?: number;
    shopId: string;
    selectedProduct?: string;
    createdAt?: Date;
    updatedAt?: Date;
}