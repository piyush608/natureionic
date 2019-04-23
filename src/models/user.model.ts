export class User {
    about: string;
    email: string;
    _id: string;
    latestPost: {
        docId: string,
        type: string
    };
    name: string;
    onboarding: boolean;
    password: string;
    phone: string;
    points: number;
    registeredDate: string;
    userName: string;
    verified: boolean;
    zipcode: string;
    articles: [{
        _id: string,
        articleId: string
    }];
    businesses: [{
        _id: string,
        businessId: string
    }];
    factCards: [{
        _id: string,
        cardId: string,
        innerCardId: string
    }];
    followings: [{
        _id: string,
        userId: string
    }];
    locations: [{
        _id: string,
        city: string,
        location: {
            _lat: number,
            _long: number
        },
        date: Date
    }];
    huntedProducts: [{
        _id: string,
        huntedProductId: string
    }];
    recipes: [{
        _id: string,
        recipeId: string
    }];
    search: [{
        _id: string,
        keywordId: string,
        date: Date
    }];
    preferences: [{
        name: string,
        iconURL: string
    }];
    photo: any;
    constructor() {}
}