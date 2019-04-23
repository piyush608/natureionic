import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Storage } from '@ionic/storage';

@Injectable()
export class CacheProvider {

  reloader$: BehaviorSubject<any>;
  bookmarkedBusinesses: Observable<any>;

  recipeReloader$: BehaviorSubject<any>;
  bookmarkedRecipes: Observable<any>;

  articleReloader$: BehaviorSubject<any>;
  bookmarkedArticles: Observable<any>;

  factCardsReloader$: BehaviorSubject<any>;
  bookmarkedFactCards: Observable<any>;

  productReloader$: BehaviorSubject<any>;
  bookmarkedProducts: Observable<any>;

  videoReloader$: BehaviorSubject<any>;
  bookmarkedVideos: Observable<any>;

  constructor(public http: HttpClient, private storage: Storage) {
    this.reloader$ =  new BehaviorSubject(null)
    this.bookmarkedBusinesses = this.reloader$.asObservable();

    this.recipeReloader$ =  new BehaviorSubject(null)
    this.bookmarkedRecipes = this.recipeReloader$.asObservable();

    this.articleReloader$ =  new BehaviorSubject(null)
    this.bookmarkedArticles = this.articleReloader$.asObservable();

    this.factCardsReloader$ =  new BehaviorSubject(null)
    this.bookmarkedFactCards = this.factCardsReloader$.asObservable();

    this.productReloader$ =  new BehaviorSubject(null)
    this.bookmarkedProducts = this.productReloader$.asObservable();

    this.videoReloader$ =  new BehaviorSubject(null)
    this.bookmarkedVideos = this.videoReloader$.asObservable();
  }


  setBookmarkedBusinesses(data) {
    this.storage.set('bookmarkedBusinesses', data).then(a=>{
      this.reloader$.next(a);
    });
  }

  setBookmarkedRecipes(data) {
    this.storage.set('bookmarkedRecipes', data).then(a=>{
      this.recipeReloader$.next(a);
    });
  }

  setBookmarkedArticles(data) {
    this.storage.set('bookmarkedArticles', data).then(a=>{
      this.articleReloader$.next(a);
    });
  }

  setBookmarkedVideos(data) {
    this.storage.set('bookmarkedVideos', data).then(a=>{
      this.videoReloader$.next(a);
    });
  }

  setBookmarkedFactCards(data) {
    this.storage.set('bookmarkedFactCards', data).then(a=>{
      this.factCardsReloader$.next(a);
    });
  }

  setBookmarkedProducts(data) {
    this.storage.set('bookmarkedProducts', data).then(a=>{
      this.productReloader$.next(a);
    });
  }
}