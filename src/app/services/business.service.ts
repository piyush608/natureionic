import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class BusinessService {
  constructor(private http: HttpClient) {}

  addBusiness(business) {
    return this.http.post(environment.BUSINESS_URL + "/create", business);
  }

  update(_id, business) {
    return this.http.patch(
      environment.BUSINESS_URL + "/update/" + _id,
      business
    );
  }
}
