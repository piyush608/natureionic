export class Recipe {
    addedBy: string;
    business: Array<string>;
    category: string;
    _id: string;
    ingredients: Array<string>;
    likes: number;
    name: string;
    sponsered: boolean;
    steps: Array<string>;
    subCategory: string;
    preferences: Array<string>;
    recipeUploader: {
        name: string;
        recipeUrl: string;
        sourceUrl: string;
    };
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