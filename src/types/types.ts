
export type IBrand = {
    image: {
        public_id: string;
        url: string;
    }
    title: string;
    createdAt?: Date;
    updatedAt?: Date;
}



export type ICategory = {
    _id: string;
    image: {
        public_id: string;
        url: string;
    };
    title: string;
    createdAt?: Date;
    updatedAt?: Date;
}



