export class Blog {
  _id: string;
  addedBy: any;
  featuredBy: any;
  lastModifiedBy: any;
  modifiedAt: Array<any>;
  category: any;
  title: string;
  url: string;
  source: string;
  timestamp: Date;
  featured: boolean;
  likes: number;
  author: string;
  visibility: boolean;
  city: string;
  state: string;
  tag: any;
  photos: Array<any>;
  audience: string;
  copyright: boolean;

  constructor() {
    this.timestamp = new Date();
    this.source = "external";
    this.modifiedAt = [];
    this.photos = [];
    this.category = "";
    this.audience = "";
    this.copyright = true;
  }
}
