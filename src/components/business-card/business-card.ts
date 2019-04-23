import { Component, Input, OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BookmarkProvider } from '../../providers/bookmark/bookmark';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'business-card',
  templateUrl: 'business-card.html'
})
export class BusinessCardComponent implements OnInit {
  @Input('item') item: any;
  public businessName: string;
  public url: string;
  public flag: boolean;
  public isBookmarked;
  public bookmarked;

  constructor(
    public navCtrl: NavController,
    private angBookmark: BookmarkProvider,
    private toastCtrl: ToastController,
    private angUser: UserProvider,
    private storage: Storage
  ) {
  }

  ngOnInit() {
    if (this.item.name.length > 27) this.businessName = this.item.name.substr(0, 27) + " ...";
    else this.businessName = this.item.name;

    this.angUser.bookmarkedBusinessesList.subscribe(res => {
      if (res && res.length > 0) {
        for (let index = 0; index < res.length; index++) {
          if (this.item._id === res[index]) {
            this.isBookmarked = { id: res[index], flag: true };
            this.bookmarked = true;
            break;
          } else {
            this.isBookmarked = { id: null, flag: false };
            this.bookmarked = false;
          }
        }
      } else {
        this.isBookmarked = { id: null, flag: false };
        this.bookmarked = false;
      }
    });
  }

  openBusiness() {
    this.navCtrl.push('business-page', { business: this.item });
  }

  bookmark() {
    this.storage.get('userData').then(user => {
      if (this.isBookmarked.flag === true) {
        var businessSchema = {
          _id: this.isBookmarked.id,
          businessId: this.item._id
        };

        this.angBookmark.debookmarkBusiness(user._id, businessSchema).subscribe(res => {
          this.isBookmarked.flag = !this.isBookmarked.flag;
          let toast = this.toastCtrl.create({
            message: 'Business removed from collection',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          this.angUser.getUserBusinessBookmarksList();
          this.angBookmark.getBookmarkedBusinesses();
        }, err => {
          console.log(JSON.stringify(err));
        });
      } else {
        this.angBookmark.bookmarkBusiness(this.item._id, user._id).subscribe(res => {
          this.isBookmarked.flag = !this.isBookmarked.flag;
          let toast = this.toastCtrl.create({
            message: 'Business saved to collection',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          this.angUser.getUserBusinessBookmarksList();
          this.angBookmark.getBookmarkedBusinesses();
        }, err => {
          console.log(JSON.stringify(err));
        });
      }
    });
  }
}