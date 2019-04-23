export class Business {
    addedBy: string;
    address: string;
    category: string;
    city: string;
    email: string;
    likes: number;
    _id: string;
    location: {
        _lat: number,
        _long: number
    };
    name: string;
    phone: string;
    sponsored: boolean;
    state: string;
    status: string;
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