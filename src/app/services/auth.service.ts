import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  deleteToken() {
    localStorage.clear();
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split(".")[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    if (!this.getToken() || this.getToken() === "undefined") {
      this.loggedIn.next(false);
      return this.loggedIn.asObservable();
    } else {
      this.loggedIn.next(true);
      return this.loggedIn.asObservable();
    }
  }

  login(user) {
    return this.http.post(environment.BASE_URL + "/login", user);
  }

  signup(user) {
    return this.http.post(environment.BASE_URL + "/register", user);
  }

  logout() {
    this.deleteToken();
    return true;
  }
}
