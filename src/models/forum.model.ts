export class Forum {
    addedBy: any;
    date: Date;
    description: string;
    dislikes: number;
    title: string;
    comments: number;
    likes: number;
    tag: any;
    _id: string;
    likesCollection: any[];
    dislikesCollection: any[];
    commentsCollection: [{
        _id?: string,
        addedBy: string,
        comment: string,
        date: Date,
        likes?: number,
        dislikes?: number
    }];
    photos: [{
        _id: string,
        originalUrl: string,
        thumb100Url: string,
        thumb400Url: string
    }];
    constructor() {}
}