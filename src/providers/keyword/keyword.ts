import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { BASE_URL } from '../../app/app.url.config';

@Injectable()
export class KeywordProvider {
  key$: BehaviorSubject<string | null>;
  public uid: string;

  constructor(public http: HttpClient) {}

  getKeyword(keyword) {
    // this.key$ = new BehaviorSubject(null);

    // return this.key$.switchMap(key =>
    //   this.angFirestore.collection("serachedKeywords", ref => ref.where("query", "==", keyword)).snapshotChanges().map(actions => {
    //     if (actions.toString()) {
    //       return actions.map(a => {
    //         const count = a.payload.doc.data().count;
    //         const id = a.payload.doc.id;
    //         return { id, count };
    //       });
    //     } else {
    //       return false;
    //     }
    //   })
    // );
  }

  createLocationKeyword(uid, loc) {
    return this.http.patch(BASE_URL + '/createLocationInfo/' + uid, loc);
  }

  updatelocationKeyword(uid, loc) {
    return this.http.patch(BASE_URL + '/updateLocationInfo/' + uid + '/' + loc._id, loc);
  }

  updateKeyword(keywordId, newCount) {
    // return this.angFirestore.collection("serachedKeywords").doc(keywordId).update({ count: newCount });
  }

  addKeyword(keyword, docId) {
    // return this.angFirestore.collection("serachedKeywords").doc(docId).set({
    //   query: keyword,
    //   count: 1
    // });
  }

  findUser(keywordId, uid) {
    // this.key$ = new BehaviorSubject(null);

    // return this.key$.switchMap(key =>
    //   this.angFirestore.collection("users").doc(uid).collection("search", ref => ref.where("keywordId", "==", keywordId)).snapshotChanges().map(actions => {
    //     if (actions.toString()) {
    //       return actions.map(a => {
    //         const id = a.payload.doc.id;
    //         return id;
    //       });
    //     } else {
    //       return false;
    //     }
    //   })
    // );
  }

  updateUser(docId, uid) {
    // return this.angFirestore.collection("users").doc(uid).collection("search").doc(docId).update({
    //   date: new Date()
    // });
  }

  createUser(keyword, uid) {
    // return this.angFirestore.collection("users").doc(uid).collection("search").add({
    //   date: new Date(),
    //   keywordId: keyword
    // });
  }
}