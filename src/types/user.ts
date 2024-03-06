export type IAddress = {
    state: string;
    country: string;
    city: string;
    address1: string;
    address2: string;
    pinCode: number;
    addressType: string;
};

export type IUser = {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    addresses?: IAddress[];
    role?: 'USER' | 'ADMIN';
    avatar?: {
        public_id: string;
        url: string;
    };
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    // comparePassword: (password: string) => Promise<boolean>;
    // SignAccessToken: () => string;
    // SignRefreshToken: () => string;
    // createPasswordResetToken: () => string;
    createdAt?: Date;
    updatedAt?: Date;
}