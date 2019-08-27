export class User {
  _id: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isModerator: boolean;
  device: string;
  deviceType: string;
  browser: string;
  isLoggedIn: boolean;
  lastLoggedIn: Array<any>;
  loggedInMonth: number;
  loggedInYear: number;
  zipcode: number;
  location: Array<any>;
  isSubscribed: boolean;
  likedBusinesses: Array<any>;
  likedRecipes: Array<any>;
  likedProducts: Array<any>;
  bookmarkedBusinesses: Array<any>;
  bookmarkedRecipes: Array<any>;
  bookmarkedProducts: Array<any>;
  name: string;
  about: string;
  onboarding: boolean;
  phone: string;
  points: number;
  photo: Array<any>;
  timestamp: Date;
  verified: boolean;
  referCode: string;
  joinedReferCode: string;

  constructor() {
    this.points = 0;
    this.isAdmin = false;
    this.isModerator = false;
    this.isLoggedIn = true;
    this.isSubscribed = true;
    this.onboarding = false;
    this.verified = false;
    this.likedBusinesses = [];
    this.likedRecipes = [];
    this.likedProducts = [];
    this.bookmarkedBusinesses = [];
    this.bookmarkedRecipes = [];
    this.bookmarkedProducts = [];
    this.photo = [];
  }
}
