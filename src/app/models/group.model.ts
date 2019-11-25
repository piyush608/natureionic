export class Group {
  _id: string;
  photos: Array<any>;
  approvedRequests: Array<any>;
  declinedRequests: Array<any>;
  pendingRequests: Array<any>;
  addedBy: any;
  category: any;
  membersCount: number;
  city: string;
  state: string;
  country: string;
  name: string;
  timestamp: Date;
  visibility: boolean;

  constructor() {
    this.photos = [];
    this.approvedRequests = [];
    this.declinedRequests = [];
    this.pendingRequests = [];
    this.timestamp = new Date();
    this.visibility = true;
    this.category = "";
  }
}
