import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class VlogService {
  constructor(private http: HttpClient) {}

  create(vlog) {
    return this.http.post(environment.VLOG_URL + "/create", vlog);
  }

  getRandom() {
    return this.http.get(environment.VLOG_URL + "/random");
  }

  getPopular() {
    return this.http.get(environment.VLOG_URL + "/getPopular");
  }

  getUserVlogs(_id) {
    return this.http.get(environment.VLOG_URL + "/getUserVlogs/" + _id);
  }

  getAll(skip) {
    return this.http.get(environment.VLOG_URL + "/getAll/" + skip);
  }
}
