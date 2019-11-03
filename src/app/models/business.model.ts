export class Business {
  _id: string;
  name: string;
  category: any;
  email: string;
  phone: any;
  timestamp: Date;
  address: string;
  city: string;
  state: string;
  country: string;
  location: {
    _lat: Number;
    _long: Number;
  };
  status: boolean;
  sponsered: boolean;
  likes: number;
  likedBy: Array<any>;
  source: string;
  timing: Array<any>;
  addedBy: any;
  approvedBy: any;
  photos: Array<any>;
  lastModifiedBy: any;
  modifiedAt: Array<Date>;
  emailStatus: boolean;

  constructor() {
    this.likes = 0;
    this.timestamp = new Date();
    this.source = "externel";
    this.emailStatus = false;
    this.sponsered = false;
    this.status = false;
    this.likedBy = [];
    this.timing = [];
    this.photos = [];
    this.location = {
      _lat: 0,
      _long: 0
    };
    this.category = "";
  }
}
