import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class FeedbackService {
  constructor(private http: HttpClient) {}

  create(feedback) {
    return this.http.post(environment.FEEDBACK_URL + "/create", feedback);
  }
}
