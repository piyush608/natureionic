import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public reloader$: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private http: HttpClient, private storage: Storage) {
    this.reloader$ = new BehaviorSubject(null);
    this.user = this.reloader$.asObservable();
  }

  setUser(data) {
    this.storage.set("user", data).then(a => {
      this.reloader$.next(a);
    });
  }

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

  deactivateAccount() {
    return this.http.get(environment.BASE_URL + "/deactivateAccount");
  }
}
