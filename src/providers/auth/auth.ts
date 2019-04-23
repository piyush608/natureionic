import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BASE_URL } from '../../app/app.url.config';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthProvider {
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(public http: HttpClient) { }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  login(user) {
    return this.http.post(BASE_URL + '/login', user, this.noAuthHeader);
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else { return null; }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) { return userPayload.exp > Date.now() / 1000; } else { return false; }
  }

  sendEmailVerification() {
    // return this.angFireAuth.auth.currentUser.sendEmailVerification();
  }

  getEmailVerificationData() {
    // if (this.angFireAuth.auth.currentUser.emailVerified) {
    //   this.updateEmailVerificationData();
    // }
  }

  updateEmailVerificationData() {
    // return this.angFireStore.doc("users/" + this.angFireAuth.auth.currentUser.uid).update({
    //   verified: true
    // });
  }

  register(user) {
    return this.http.post(BASE_URL + '/signup', user, this.noAuthHeader);
  }

  forgotPassword(email) {
    return this.http.post(BASE_URL + '/forgotPassword', { email: email });
  }

  resetEmail(email) {
    
  }

  updateResetEmail(email) {
    
  }

  resetPassword(password) {
    
  }

  deleteAccount() {
    
  }

  signout() {
    this.deleteToken();
  }
}
