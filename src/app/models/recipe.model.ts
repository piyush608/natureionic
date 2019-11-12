export class Recipe {
  _id: string;
  name: string;
  category: any;
  subcategory: any;
  timestamp: Date;
  businesses: Array<any>;
  featured: boolean;
  likes: number;
  addedBy: any;
  photos: Array<any>;
  lastModifiedBy: any;
  modifiedAt: Array<Date>;
  featuredBy: any;
  ingredients: Array<string>;
  steps: Array<string>;
  tags: Array<any>;
  source: string;
  sourceURL: string;
  ownerName: string;
  ownerImage: any;
  dietPreference: any;
  foodAlergies: any;

  constructor() {
    this.timestamp = new Date();
    this.likes = 0;
    this.featured = false;
    this.ingredients = [];
    this.steps = [];
    this.tags = [];
    this.modifiedAt = [];
    this.businesses = [];
    this.category = "";
    this.subcategory = "";
    this.source = "externel";
  }
}
