import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class VlogService {
  constructor(private http: HttpClient) {}

  getRandom() {
    return this.http.get(environment.VLOG_URL + "/random");
  }

  getUserVlogs(_id) {
    return this.http.get(environment.VLOG_URL + "/getUserVlogs/" + _id);
  }
}
