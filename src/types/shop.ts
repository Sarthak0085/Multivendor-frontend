export type ITransaction = {
    amount: number;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type IWithdraw = {
    bankName: string;
    bankCountry: string;
    bankSwiftCode: string;
    bankAccountNumber: number;
    bankHolderName: string;
    bankAddress: string;
};

export type IShop = {
    _id: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    description?: string;
    address: string;
    role?: string;
    avatar: {
        public_id: string;
        url: string;
    };
    pinCode: number;
    withdrawMethod?: {
        bankName: string;
        bankCountry: string;
        bankSwiftCode: string;
        bankAccountNumber: string;
        bankHolderName: string;
        bankAddress: string;
    };
    availableBalance?: number;
    transactions: ITransaction[];
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    // SignAccessToken(): string;
    // SignRefreshToken(): string;
    // createPasswordResetToken(): string;
    // comparePassword: (password: string) => Promise<boolean>;
    createdAt?: Date;
    updatedAt?: Date;
}