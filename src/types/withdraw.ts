export type IWithdraw = {
    _id: string;
    seller: object | string;
    amount: number;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}