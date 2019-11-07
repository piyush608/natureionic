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
}
