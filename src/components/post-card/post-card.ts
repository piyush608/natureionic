import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'post-card',
  templateUrl: 'post-card.html'
})
export class PostCardComponent {
  @Input('item') user = new User();
  url = 'assets/imgs/default-image.png';

  constructor(
    public navCtrl: NavController,

  ) {
  }

  ngOnInit() {}

  openPost(post) {
    if(post.type === 'business') this.navCtrl.push('business-page', { id: post.docId });
    else if(post.type === 'recipe') this.navCtrl.push('recipe-page', { id: post.docId });
    else this.navCtrl.push('hunted-products-page', { id: post.docId });
  }
}