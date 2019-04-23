import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CollectionProvider {
  constructor(public http: HttpClient) {
  }

  bookmarkBusiness(uid, businessId) {
    // this.angFirestore.collection("users").doc(uid).collection("businesses").add({
    //   business: businessId
    // });
  }

  bookmarkRecipe(uid, recipeId) {
    // this.angFirestore.collection("users").doc(uid).collection("recipes").add({
    //   recipe: recipeId
    // });
  }

  bookmarkAltProduct(uid, altProductId) {
    // this.angFirestore.collection("users").doc(uid).collection("altProducts").add({
    //   altProduct: altProductId
    // });
  }

  bookmarkArticle(guid, uid) {
    // return this.angFirestore.collection('users').doc(uid).collection('articles', ref => ref.where('guid', '==', guid)).snapshotChanges().map(actions => {
    //   if(actions.toString()) return true;
    //   else return false;
    // });
  }
}