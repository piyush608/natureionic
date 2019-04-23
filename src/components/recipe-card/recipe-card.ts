import { BookmarkProvider } from './../../providers/bookmark/bookmark';
import { Component, Input, OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { RecipeProvider } from '../../providers/recipe/recipe';
import * as io from 'socket.io-client';
import { BASE_URL } from '../../app/app.url.config';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'recipe-card',
  templateUrl: 'recipe-card.html'
})
export class RecipeCardComponent implements OnInit {
  @Input('item') item: any;
  public recipeName: string;
  public url: string;
  public flag: boolean;
  isBookmarked;
  bookmarked;
  postedBy;
  authorImage;

  private socket: any;

  constructor(
    public navCtrl: NavController,
    private angBookmark: BookmarkProvider,
    private toastCtrl: ToastController,
    private angUser: UserProvider,
    private angRecipe: RecipeProvider,
    private storage: Storage
  ) {
    this.socket = io(BASE_URL);
  }

  ngOnInit() {
    if (this.item.name.length > 41) this.recipeName = this.item.name.substr(0, 40) + " ...";
    else this.recipeName = this.item.name;

    this.socket.on('refreshRecipeLike', (data) => {
      this.angRecipe.getUpdatedLikes(this.item._id).subscribe(res => {
        this.item.likes = res['likes'];
        this.item.likesCollection = res['likesCollection'];
      });
    });

    this.angUser.bookmarkedRecipesList.subscribe(recipes => {
      if (recipes && recipes.length > 0) {
        for (let index = 0; index < recipes.length; index++) {
          if (this.item._id === recipes[index]) {
            this.isBookmarked = { id: recipes[index], flag: true };
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

  openRecipe() {
    this.navCtrl.push('recipe-page', { recipe: this.item });
  }

  bookmark() {
    this.storage.get('userData').then(user => {
      if (this.isBookmarked.flag === true) {
        var recipeSchema = {
          _id: this.isBookmarked.id,
          recipeId: this.item._id
        };

        this.angBookmark.debookmarkRecipe(user._id, recipeSchema).subscribe(res => {
          this.isBookmarked.flag = !this.isBookmarked.flag;
          let toast = this.toastCtrl.create({
            message: 'Recipe removed from collection',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          this.angUser.getUserRecipeBookmarksList();
          this.angBookmark.getBookmarkedRecipes();
        }, err => {
          console.log(JSON.stringify(err));
        });
      } else {
        this.angBookmark.bookmarkRecipe(this.item._id, user._id).subscribe(res => {
          this.isBookmarked.flag = !this.isBookmarked.flag;
          let toast = this.toastCtrl.create({
            message: 'Recipe saved to collection',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          this.angUser.getUserRecipeBookmarksList();
          this.angBookmark.getBookmarkedRecipes();
        }, err => {
          console.log(JSON.stringify(err));
        });
      }
    });
  }
}