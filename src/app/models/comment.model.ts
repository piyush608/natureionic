export class Comment {
  _id: string;
  addedBy: any;
  parent: any;
  isRoot: boolean;
  comment: string;
  likes: number;
  dislikes: number;
  reportCount: number;
  timestamp: Date;
  visibility: boolean;
  photos: Array<any>;
  reportedBy: Array<any>;

  constructor() {
    this.timestamp = new Date();
    this.photos = [];
    this.reportedBy = [];
    this.isRoot = true;
  }
}
