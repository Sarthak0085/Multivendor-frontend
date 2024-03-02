export type FaqItem = {
    question: string;
    answer: string;
}

export type BannerImage = {
    public_id: string;
    url: string;
}

export type Layout = {
    type: string;
    faq: FaqItem[];
    banner: {
        image: BannerImage;
        title: string;
        subTitle: string;
    };
}