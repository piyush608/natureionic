import { BASE_URL, RECIPE_URL, HUNTEDPRODUCT_URL, ARTICLE_URL } from '../../app/app.url.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as io from 'socket.io-client';
import { NotificationProvider } from '../notifications/notification';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserProvider {
  businessListReloader$: BehaviorSubject<any>;
  bookmarkedBusinessesList: Observable<any>;

  recipeListReloader$: BehaviorSubject<any>;
  bookmarkedRecipesList: Observable<any>;

  huntedProductListReloader$: BehaviorSubject<any>;
  bookmarkedhubtedProductsList: Observable<any>;

  articleListReloader$: BehaviorSubject<any>;
  bookmarkedArticlesList: Observable<any>;

  videoListReloader$: BehaviorSubject<any>;
  bookmarkedVideosList: Observable<any>;

  socket: any;

  constructor(
    public http: HttpClient,
    private angAuth: AuthProvider,
    private angNotification: NotificationProvider,
    private storage: Storage
  ) {
    this.businessListReloader$ =  new BehaviorSubject(null);
    this.bookmarkedBusinessesList = this.businessListReloader$.asObservable();

    this.recipeListReloader$ =  new BehaviorSubject(null);
    this.bookmarkedRecipesList = this.recipeListReloader$.asObservable();

    this.huntedProductListReloader$ =  new BehaviorSubject(null);
    this.bookmarkedhubtedProductsList = this.huntedProductListReloader$.asObservable();

    this.articleListReloader$ =  new BehaviorSubject(null);
    this.bookmarkedArticlesList = this.articleListReloader$.asObservable();

    this.videoListReloader$ =  new BehaviorSubject(null);
    this.bookmarkedVideosList = this.videoListReloader$.asObservable();

    this.socket = io(BASE_URL);
  }

  getHeader() {
    return new HttpHeaders({ 'AUTHORIZATION': 'bearer ' + this.angAuth.getToken() });
  }

  getUserDetails() {
    let headers = new HttpHeaders();

    this.http.get(BASE_URL + "/getProfile", { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) }).subscribe(res => {
      this.storage.set('userData', res['user']);
      // this.getSocketOn();
      this.getUserBusinessBookmarksList();
      this.getUserArticleBookmarksList();
      this.getUserVideoBookmarksList();
      this.getUserHuntedProductBookmarksList();
      this.getUserRecipeBookmarksList();
    }, err => {
      console.log(JSON.stringify(err));
    });
  }

  getSocketOn() {
    this.angNotification.getNotifications();
    this.socket.on('userNotification', (data) => {
      this.angNotification.getNotifications();
    });
  }

  getUserFollowings(uid) {
    return this.http.get(BASE_URL + '/getUserFollowings/' + uid);
  }

  getUserPoints(uid) {
    return this.http.get(BASE_URL + '/getUserPoints/' + uid);
  }

  getUserFollowers(uid) {
    return this.http.get(BASE_URL + "/getUserFollowers/" + uid);
  }

  getSearchedLocations() {
    let headers = new HttpHeaders();

    return this.http.get(BASE_URL + '/getUserSearchedLocations', { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) });
  }

  getSearchedHistory() {
    let headers = new HttpHeaders();

    return this.http.get(BASE_URL + '/getUserSearchedHistory', { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) });
  }

  getUserBusinessBookmarksList() {
    let headers = new HttpHeaders();

    this.http.get(BASE_URL + "/getBookmarkBuisnessesList", { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) }).subscribe(res => {
      if (res['businesses'].businesses && res['businesses'].businesses.length>0) {
        this.businessListReloader$.next(res['businesses'].businesses);
      } else {
        this.businessListReloader$.next(null);
      }
    });
  }

  getUserRecipeBookmarksList() {
    let headers = new HttpHeaders();

    this.http.get(BASE_URL + "/getBookmarkRecipesList", { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) }).subscribe(res => {
      if (res['recipes'].recipes && res['recipes'].recipes.length>0) {
        this.recipeListReloader$.next(res['recipes'].recipes);
      } else {
        this.recipeListReloader$.next(null);
      }
    });
  }

  getUserHuntedProductBookmarksList() {
    let headers = new HttpHeaders();

    this.http.get(BASE_URL + "/getBookmarkHuntedProductsList", { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) }).subscribe(res => {
      if (res['huntedProducts'].huntedProducts && res['huntedProducts'].huntedProducts.length>0) {
        this.huntedProductListReloader$.next(res['huntedProducts'].huntedProducts);
      } else {
        this.huntedProductListReloader$.next(null);
      }
    });
  }

  getUserArticleBookmarksList() {
    let headers = new HttpHeaders();

    this.http.get(BASE_URL + "/getBookmarkArticlesList", { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) }).subscribe(res => {
      if (res['articles'].articles && res['articles'].articles.length>0) {
        this.articleListReloader$.next(res['articles'].articles);
      } else {
        this.articleListReloader$.next(null);
      }
    });
  }

  getUserVideoBookmarksList() {
    let headers = new HttpHeaders();

    this.http.get(BASE_URL + "/getBookmarkVideosList", { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) }).subscribe(res => {
      if (res['videos'].videos && res['videos'].videos.length>0) {
        this.videoListReloader$.next(res['videos'].videos);
      } else {
        this.videoListReloader$.next(null);
      }
    });
  }

  getUsersDetail(userId) {
    return this.http.get(BASE_URL + '/getUserDetails/' + userId);
  }

  getUserProfile(userId) {
    return this.http.get(BASE_URL + '/getUserProfile/' + userId);
  }

  getUserZipcode() {
    let headers = new HttpHeaders();

    return this.http.get(BASE_URL + '/getUserZipcode', { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) });
  }

  getUserRegistrationDate() {
    let headers = new HttpHeaders();

    return this.http.get(BASE_URL + '/getUserRegistrationDate', { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) });
  }

  getPoints() {
    let headers = new HttpHeaders();

    return this.http.get(BASE_URL + '/getPoints', { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) });
  }

  updateUserDetails(user, uid) {
    return this.http.patch(BASE_URL + "/updateProfile/" + uid, user);
  }

  updateUserPassword(user, uid) {
    return this.http.patch(BASE_URL + "/updatePassword/" + uid, user);
  }

  updateUserPoint(uid, points) {
    this.http.patch(BASE_URL + '/updatePoint/' + uid, { point: points }).subscribe(res => {
      this.getUserDetails();
    }, err => {
      console.log(JSON.stringify(err));
    });
  }

  editUserDetails(user) {
    let headers = new HttpHeaders();

    return this.http.patch(BASE_URL + '/updateProfile', user, { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) });
  }

  followUser(uid, userId) {
    return this.http.patch(BASE_URL + '/followUser/' + uid, { userId: userId });
  }

  unfollowUser(uid, data) {
    return this.http.patch(BASE_URL + '/unfollowUser/' + uid, data);
  }

  createUserSearch(uid, keyword) {
    return this.http.patch(BASE_URL + '/craeteUserSearch/' + uid, keyword);
  }

  updateUserSearch(uid, keyword) {
    return this.http.patch(BASE_URL + '/updateUserSearch/' + uid + '/' + keyword._id, keyword);
  }

  getRecipes(uid) {
    return this.http.get(RECIPE_URL + '/getAddedRecipes/' + uid);
  }

  getHuntedProducts(uid) {
    return this.http.get(HUNTEDPRODUCT_URL + '/getAddedHuntedProducts/' + uid);
  }

  getBlogs(uid) {
    return this.http.get(ARTICLE_URL + '/getAddedArticles/' + uid);
  }
}