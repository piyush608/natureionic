import { Component, Input, OnInit } from '@angular/core';
import { FactCard } from '../../models/fact-cards.model';
import { BookmarkProvider } from '../../providers/bookmark/bookmark';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'fact-card',
  templateUrl: 'fact-card.html'
})
export class FactCardComponent implements OnInit {
  @Input('item') innerCard = new FactCard();
  @Input('colId') cardId: string;
  public flag: boolean;
  public isBookmarked;
  public bookmarked;

  constructor(
    private angBookmark: BookmarkProvider,
    public toastCtrl: ToastController,
    private storage: Storage
  ) {
  }

  ngOnInit() {
    this.storage.get('userData').then(user => {
      if (!this.cardId) {
        this.cardId = this.innerCard['colId'];
      }

      if (user.factCards.length > 0) {
        user.factCards.map(res => {
          if (res.cardId === this.cardId) {
            if (res.innerCardId === this.innerCard._id) {
              this.isBookmarked = { _id: res._id, cardId: this.cardId, innerCardId: this.innerCard._id, flag: true };
              this.bookmarked = true;
              return;
            } else {
              this.isBookmarked = { _id: null, cardId: null, innerCardId: null, flag: false };
              this.bookmarked = false;  
            }
          } else {
            this.isBookmarked = { _id: null, cardId: null, innerCardId: null, flag: false };
            this.bookmarked = false;
          }
        });
      } else {
        this.isBookmarked = { _id: null, cardId: null, innerCardId: null, flag: false };
        this.bookmarked = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.bookmarked !== this.isBookmarked.flag) {
      this.storage.get('userData').then(user => {
        if (this.bookmarked === true) {
          var factCardSchema = {
            _id: this.isBookmarked._id,
            cardId: this.cardId,
            innerCardId: this.innerCard._id
          };

          this.angBookmark.debookmarkFactCard(user._id, factCardSchema).subscribe(res => {
            console.log(JSON.stringify(res));
          }, err => {
            console.log(JSON.stringify(err));
          });
        } else {
          this.angBookmark.bookmarkFactCard(this.cardId, this.innerCard._id, user._id).subscribe(res => {
            console.log(JSON.stringify(res));
          }, err => {
            console.log(JSON.stringify(err));
          });
        }
      });
    }
  }

  bookmark() {
    if (this.isBookmarked.flag === true) {
      this.isBookmarked.flag = !this.isBookmarked.flag;
      let toast = this.toastCtrl.create({
        message: 'Fact card removed from collection',
        duration: 1500,
        position: 'bottom'
      });
      toast.present();
    } else {
      this.isBookmarked.flag = !this.isBookmarked.flag;
      let toast = this.toastCtrl.create({
        message: 'Fact card saved to collection',
        duration: 1500,
        position: 'bottom'
      });
      toast.present();
    }
  }
}