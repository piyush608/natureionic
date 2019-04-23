export class Product {
    addedBy: string;
    category: string;
    description: string;
    founderDescription: string;
    founderName: string;
    logoUrl: string;
    _id: string;
    name: string;
    likes: number;
    sponsered: boolean;
    subCategory: string;
    price: string;
    likesCollection: [{
        _id: string,
        userId: string
    }];
    photos: [{
        _id: string,
        originalUrl: string,
        thumb100Url: string,
        thumb400Url: string
    }];
    constructor() {}
}