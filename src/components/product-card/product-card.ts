import { Component, Input, OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BookmarkProvider } from '../../providers/bookmark/bookmark';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'product-card',
  templateUrl: 'product-card.html'
})

export class ProductCardComponent implements OnInit {
  @Input('item') item: any;
  public productName: string;
  public url: string;
  public flag: boolean;
  isBookmarked;
  bookmarked;
  postedBy;
  authorImage;

  constructor(
    public navCtrl: NavController,
    private angBookmark: BookmarkProvider,
    private toastCtrl: ToastController,
    private angUser: UserProvider,
    private storage: Storage
  ) {
  }

  ngOnInit() {
    if (this.item.name.length > 25) this.productName = this.item.name.substr(0, 25) + " ...";
    else this.productName = this.item.name;

    this.angUser.bookmarkedhubtedProductsList.subscribe(res => {
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

  openProduct() {
    this.navCtrl.push('hunted-products-page', { product: this.item });
  }

  bookmark() {
    this.storage.get('userData').then(user => {
      if (this.isBookmarked.flag === true) {
        var huntedProductSchema = {
          _id: this.isBookmarked.id,
          huntedProductId: this.item._id
        };

        this.angBookmark.debookmarkProduct(user._id, huntedProductSchema).subscribe(res => {
          this.isBookmarked.flag = !this.isBookmarked.flag;
          let toast = this.toastCtrl.create({
            message: 'Product removed from collection',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          this.angUser.getUserHuntedProductBookmarksList();
          this.angBookmark.getBookmarkProducts();
        }, err => {
          console.log(JSON.stringify(err));
        });
      } else {
        this.angBookmark.bookmarkProduct(this.item._id, user._id).subscribe(res => {
          this.isBookmarked.flag = !this.isBookmarked.flag;
          let toast = this.toastCtrl.create({
            message: 'Product saved to collection',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          this.angUser.getUserHuntedProductBookmarksList();
          this.angBookmark.getBookmarkProducts();
        }, err => {
          console.log(JSON.stringify(err));
        });
      }
    });
  }
}