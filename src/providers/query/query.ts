import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class QueryProvider {
  key$: BehaviorSubject<string | null>;
  data: Observable<any>

  constructor( public http: HttpClient) {
  }

  isLikedData(options) {
    // this.key$ = new BehaviorSubject(null);
    
    // return this.key$.switchMap(key =>
    //   this.angFirestore.collection(options.type).doc(options.docId).collection("likes", ref => ref.where("user", "==", options.uid)).snapshotChanges().map(actions => {
    //     if(actions.toString()){
    //       return actions.map(a => {
    //         const id = a.payload.doc.id;
    //         var flag = a.payload.doc.exists;

    //         return { id, flag };
    //       });
    //     }
    //     else{
    //       return false;
    //     }
    //   })
    // );
  }

  isLikedComment(options) {
    // this.key$ = new BehaviorSubject(null);
    
    // return this.key$.switchMap(key =>
    //   this.angFirestore.collection(options.type).doc(options.docId).collection('comments').doc(options.commentId).collection("likes", ref => ref.where("user", "==", options.uid)).snapshotChanges().map(actions => {
    //     if(actions.toString()){
    //       return actions.map(a => {
    //         const id = a.payload.doc.id;
    //         var flag = a.payload.doc.exists;

    //         return { id, flag };
    //       });
    //     }
    //     else{
    //       return false;
    //     }
    //   })
    // );
  }

  isDislikedData(options) {
    // this.key$ = new BehaviorSubject(null);
    
    // return this.key$.switchMap(key =>
    //   this.angFirestore.collection(options.type).doc(options.docId).collection("dislikes", ref => ref.where("user", "==", options.uid)).snapshotChanges().map(actions => {
    //     if(actions.toString()){
    //       return actions.map(a => {
    //         const id = a.payload.doc.id;
    //         var flag = a.payload.doc.exists;

    //         return { id, flag };
    //       });
    //     }
    //     else{
    //       return false;
    //     }
    //   })
    // );
  }

  isDislikedComment(options) {
    // this.key$ = new BehaviorSubject(null);
    
    // return this.key$.switchMap(key =>
    //   this.angFirestore.collection(options.type).doc(options.docId).collection('comments').doc(options.commentId).collection("dislikes", ref => ref.where("user", "==", options.uid)).snapshotChanges().map(actions => {
    //     if(actions.toString()){
    //       return actions.map(a => {
    //         const id = a.payload.doc.id;
    //         var flag = a.payload.doc.exists;

    //         return { id, flag };
    //       });
    //     }
    //     else{
    //       return false;
    //     }
    //   })
    // );
  }

  isBookmarkData(options) {
    // this.key$ = new BehaviorSubject(null);

    // return this.key$.switchMap(key =>
    //   this.angFirestore.collection("users").doc(options.uid).collection(options.collection, ref =>
    //     ref.where(options.query, "==", options.docId)).snapshotChanges().map(actions => {
    //       if(actions.toString()) {
    //         return actions.map(a => {
    //           const id = a.payload.doc.id;
    //           var flag = a.payload.doc.exists;

    //           return { id, flag };
    //         });
    //       } else {
    //         return false;
    //       }
    //     })
    // );
  }

  doesFollowUser(uid, userId) {
    // this.key$ = new BehaviorSubject(null);

    // return this.key$.switchMap(key =>
    //   this.angFirestore.collection("users").doc(uid).collection('following', ref =>
    //     ref.where('userId', "==", userId)).snapshotChanges().map(actions => {
    //       if(actions.toString()) {
    //         return actions.map(a => {
    //           const id = a.payload.doc.id;
    //           var flag = a.payload.doc.exists;

    //           return { id, flag };
    //         });
    //       } else {
    //         return false;
    //       }
    //     })
    // );
  }
}