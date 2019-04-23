import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { POINT_URL, BASE_URL } from '../../app/app.url.config';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class FireProvider {

  constructor(
    public http: HttpClient, 
    private angAuth: AuthProvider
  ) {
  }

  getPoints() {
    return this.http.get(POINT_URL + '/getPoints');
  }

  submitFeedback(message) {
    let headers = new HttpHeaders();
    
    return this.http.post(BASE_URL + '/postFeedback', { message: message }, { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) });
  }
}