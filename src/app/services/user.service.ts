import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  update(_id, user) {
    return this.http.patch(environment.BASE_URL + "/update/" + _id, user);
  }

  getProfile() {
    return this.http.get(environment.BASE_URL + "/getProfile");
  }

  getProfileImage() {
    return this.http.get(environment.BASE_URL + "/getProfileImage");
  }

  getEmail() {
    return this.http.get(environment.BASE_URL + "/getEmail");
  }

  changeEmail(user) {
    return this.http.post(environment.BASE_URL + "/changeEmail", user);
  }
}
