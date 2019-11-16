export class Vlog {
  _id: string;
  addedBy: any;
  featuredBy: any;
  lastModifiedBy: any;
  modifiedAt: Array<any>;
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
  audience: string;
  copyright: boolean;

  constructor() {
    this.timestamp = new Date();
    this.source = "external";
    this.modifiedAt = [];
    this.audience = "";
    this.copyright = true;
  }
}
