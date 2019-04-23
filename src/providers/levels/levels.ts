import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LEVEL_URL } from '../../app/app.url.config';
import { AuthProvider } from '../auth/auth';


@Injectable()
export class LevelsProvider {

  constructor(
    public http: HttpClient,
    private angAuth: AuthProvider
  ) {
  }

  getLevels() {
    let headers = new HttpHeaders();

    return this.http.get(LEVEL_URL + '/getLevels', { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) });
  }

  getUserLevel(userPoint) {
    return this.http.get(LEVEL_URL + '/getUserLevel/' + userPoint);
  }

  getLevel(levelId) {
    // return this.angFire.doc('levels/' + levelId).snapshotChanges()
    //   .pipe(
    //     map(a => {
    //       let id = a.payload.id;
    //       let data = a.payload.data();
    //       return { id, ...data }
    //     })
    //   );
  }

  getNextLevel(start) {
    // return this.angFire.collection('levels', ref => ref.where('startPoint', '==', start)).snapshotChanges()
    //   .map(data => {
    //     return data.map(a => {
    //       let id = a.payload.doc.id;
    //       let data = a.payload.doc.data() as Level;
    //       return { id, ...data }
    //     })
    //   })
  }

}