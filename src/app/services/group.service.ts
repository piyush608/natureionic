import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class GroupService {
  constructor(private http: HttpClient) {}

  create(group) {
    return this.http.post(environment.GROUP_URL + "/create", group);
  }

  update(_id, group) {
    return this.http.patch(environment.GROUP_URL + "/update/" + _id, group);
  }

  getCityGroups(city) {
    return this.http.get(environment.GROUP_URL + "/getCityGroups/" + city);
  }

  getDetails(_id) {
    return this.http.get(environment.GROUP_URL + "/getDetails/" + _id);
  }

  getUserGroups(_id) {
    return this.http.get(environment.GROUP_URL + "/getUserGroups/" + _id);
  }

  getCategoryGroups(cat, city) {
    return this.http.get(
      environment.GROUP_URL + "/getCategoryGroups/" + cat + "/" + city
    );
  }
}
