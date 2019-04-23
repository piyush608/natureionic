import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BUSINESS_URL } from '../../app/app.url.config';

@Injectable()
export class BusinessProvider {
  key$: BehaviorSubject<string | null>;

  constructor(
    public http: HttpClient
  ) {
  }

  addBusiness(business) {
    return this.http.post(BUSINESS_URL + '/createBusiness', business);
  }

  getBusinessDetails(id) {
    return this.http.get(BUSINESS_URL + '/getBusiness/' + id);
  }

  getUpdatedLikes(id) {
    return this.http.get(BUSINESS_URL + '/getUpdatedLikes/' + id);
  }

  uploadBusinessImage(businessId, photoId) {
    return this.http.patch(BUSINESS_URL + '/uploadImages/' + businessId, { photoId: photoId });
  }

  getCategoryBusinesses(catId, city) {
    return this.http.get(BUSINESS_URL + '/getCategoryBusinesses', { params: {
      _catId: catId,
      city: city
    }});
  }

  getAllCityBusinesses(city) {
    return this.http.get(BUSINESS_URL + '/getAllCityBusinesses/' + city);
  }
}