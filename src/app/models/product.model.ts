export class Product {
  _id: string;
  name: string;
  category: any;
  subcategory: any;
  timestamp: Date;
  description: string;
  addedBy: any;
  featured: boolean;
  likes: number;
  photos: Array<any>;
  lastModifiedBy: any;
  modifiedAt: Array<Date>;
  featuredBy: any;
  ownerName: string;
  ownerDescription: string;
  ownerImage: any;
  price: string;

  constructor() {
    this.timestamp = new Date();
    this.likes = 0;
    this.modifiedAt = [];
    this.category = "";
    this.subcategory = "";
  }
}
