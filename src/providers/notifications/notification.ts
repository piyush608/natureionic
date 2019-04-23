import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NOTIFICATION_URL } from '../../app/app.url.config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class NotificationProvider {
  reloader$: BehaviorSubject<any>;
  notifications: Observable<any>;

  constructor(
    public http: HttpClient, 
    private angAuth: AuthProvider
  ) {
    this.reloader$ =  new BehaviorSubject(null)
    this.notifications = this.reloader$.asObservable();
  }

  addNotification(body) {
    this.http.post(NOTIFICATION_URL + '/addNotification', body).subscribe(res => {
      console.log(JSON.stringify(res));
    }, err => {
      console.log(JSON.stringify(err));
    });
  }

  getNotifications() {
    let headers = new HttpHeaders();

    this.http.get(NOTIFICATION_URL + '/getNotifications', { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) }).subscribe(res => {
      if (res && res.toString()) {
        this.reloader$.next(res);
      } else {
        this.reloader$.next(null);
      }
    }, err => {
      console.log(JSON.stringify(err));
    });
  }

  ifNotificationExists(query) {
    return this.http.get(NOTIFICATION_URL + '/ifNotificationExists', { params: 
      {
        itemId: query.itemId,
        receiver: query.receiver,
        sender: query.sender,
        type: query.type
      }
    });
  }

  updateNotification(notification) {
    this.http.patch(NOTIFICATION_URL + '/updateNotification/' + notification._id, notification).subscribe(res => {
      // console.log(JSON.stringify(res));
    }, err => {
      console.log(JSON.stringify(err));
    });
  }
}