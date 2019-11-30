export class Forum {
  _id: string;
  comments: Array<any>;
  reportCount: number;
  reportedBy: Array<any>;
  photos: Array<any>;
  addedBy: any;
  commentsCount: number;
  timestamp: Date;
  title: string;
  description: string;
  type: string;
  link: string;
  public: boolean;
  likes: number;
  dislikes: number;
  tag: any;
  visibility: boolean;
  group: any;

  constructor() {
    this.comments = [];
    this.reportedBy = [];
    this.photos = [];
    this.timestamp = new Date();
    this.public = true;
    this.visibility = true;
  }
}
