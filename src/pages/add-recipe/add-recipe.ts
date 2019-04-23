import { BookmarkProvider } from './../../providers/bookmark/bookmark';
import { FireProvider } from "./../../providers/fire/fire";
import { UploadImageProvider } from "./../../providers/upload-image/upload-image";
import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController, Platform, Slides, ToastController } from 'ionic-angular';
import { Camera } from "@ionic-native/camera";
import { Observable } from "rxjs/Observable";
import { RecipeProvider } from "../../providers/recipe/recipe";
import { ValuesProvider } from './../../providers/values/values';
import { DomSanitizer } from '@angular/platform-browser';
import { Recipe } from "../../models/recipe.model";
import { LocationProvider } from '../../providers/location/location';
import { LikeProvider } from '../../providers/like/like';
import { UserProvider } from '../../providers/user/user';
import { SearchProvider } from '../../providers/search/search';
import dataUriToBuffer from 'data-uri-to-buffer';
import { User } from '../../models/user.model';
import { CategoryProvider } from '../../providers/category/category';
import { BASE_URL } from '../../app/app.url.config';
import * as io from 'socket.io-client';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: "add-recipe-page",
  segment: "add-recipe"
})
@Component({
  selector: "page-add-recipe",
  templateUrl: "add-recipe.html"
})


export class AddRecipePage {
  // All variables
  @ViewChild(Slides) slides: Slides;

  public loc: string;
  public recipeCat: string;
  public recipeSubcat: string;
  private socket: any;

  // Boolean variables
  public switchFlag: boolean = false;
  public liked: boolean;

  // Validation variables
  nameFlag: boolean = true;
  nameText: string = 'Name is required';
  categoryFlag: boolean = true;
  categoryText: string = 'Category is required';
  subcategoryFlag: boolean = true;
  subcategoryText: string = 'Subcategory is required';
  ingredientFlag: boolean = true;
  ingredientText: string = 'Atleast one ingredient is required';
  stepFlag: boolean = true;
  stepText: string = 'Atleast one step is required';

  // Two-way binding variables
  public recipe = new Recipe();
  public user = new User();

  // Object variables
  public isLiked: {
    id: string,
    flag: boolean
  };

  public isBookmarked: {
    id: string,
    flag: boolean
  };

  private business: any;
  public trackIndex: boolean = false;
  public recipeCategory: any;
  public selectedCategory: any;
  public recipeSubcategory: any;
  public iteratorIngredients = [];
  public ingredients = [];
  public iteratorSteps = [];
  public steps = [];
  public selected = false;
  public businesses: any;
  public selectedBusinessOption: boolean = false;
  public selectedBusiness: Observable<any>;
  public selectedBusinessImage: Observable<any>;
  public selectedBusinessId: any;
  public businessListsOption: boolean = false;
  public businessListsId = [];
  public businessLists = [];
  public searchList: boolean = false;
  public preferences = [];
  public preferencesTypes = [];
  public chips = [];
  public localChips = [];
  public uid: string;
  public addRecipePoints: number;
  public userPoints: number;
  public imgURL = [];
  public image = [];
  public img = [];
  public tabsElement: any;
  public firstButtonClicked: boolean = false;
  public secondButtonClicked: boolean = false;
  public thirdButtonClicked: boolean = false;
  public forthButtonClicked: boolean = false;
  public stepCount: number = 0;
  public firstFormValid: boolean = true;
  public secondFormValid: boolean = true;
  public thirdFormValid: boolean = true;
  public fourthFormValid: boolean = true;

  public lastFormValid: boolean = true;
  public count: number = 0;
  public process = [];
  public flag: boolean = false;
  public businessSearchFlag = true;
  imageSelect;
  cameraOption: boolean = false;
  imageFlag: boolean = false;
  imgFlag: boolean = false;
  healthCount: number = 0;
  allergicCount: number = 0;
  public currentLocation: {
    city: string,
    state: string
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public uploadImage: UploadImageProvider,
    public angFire: FireProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private angRecipe: RecipeProvider,
    private camera: Camera,
    public modalCtrl: ModalController,
    private platform: Platform,
    public angValues: ValuesProvider,
    public _DomSanitizationService: DomSanitizer,
    public angLocation: LocationProvider,
    private angBookmark: BookmarkProvider,
    public toastCtrl: ToastController,
    private angLike: LikeProvider,
    private angUser: UserProvider,
    private angSearch: SearchProvider,
    private angCategory: CategoryProvider,
    private storage: Storage
  ) {
    this.recipe = new Recipe();
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");

    this.socket = io(BASE_URL);

    this.storage.get('userData').then(user => {
      this.uid = user._id;
      this.userPoints = user.points;
      this.user = user;

      this.angLocation.getLocationFromZipcode(user.zipcode.toString()).then(loc => {
        this.currentLocation = loc;
      });
    });

    this.iteratorIngredients.push("");
    this.ingredients.push("");

    this.iteratorSteps.push("");
    this.steps.push("");

    this.getAllPreferences();

    this.storage.get('pointSystems').then(res => {
      res.map(data => {
        if (data.query === 'add_recipe') {
          this.addRecipePoints = data.point;
        } else {
          this.addRecipePoints = 5;
        }
      });
    });
  }

  ngOnInit() {
    this.angCategory.getRecipeCategories().subscribe(res => {
      this.recipeCategory = res;
    }, err => {
      console.log(JSON.stringify(err));
    });
  }

  ionViewDidLoad() {
    this.platform.registerBackButtonAction(() => {
      this.prevStep();
    });
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";

    if (this.isLiked) {
      if (this.liked !== this.isLiked.flag) {
        this.storage.get('userData').then(user => {
          this.angLike.likeRecipe(this.recipe._id, user._id).subscribe(res => {
            this.socket.emit('likeRecipe', { data: 'Like Recipe Emitted' });
          }, err => {
            console.log(JSON.stringify(err));
          });
        });
      }
    }
  }

  checkName() {
    if (this.recipe.name.length > 0) {
      if (this.recipe.name.split(' ').filter(function (n) { return n != '' }).length === 0) {
        this.nameFlag = false;
        this.nameText = 'Must contain atleast one character';
      } else {
        this.nameFlag = true;
      }
    } else {
      this.nameFlag = false;
      this.nameText = 'Name is required';
    }
  }

  checkIngred() {
    if (this.ingredients && this.ingredients.length >= 1) {
      this.ingredients.map(ingred => {
        if (ingred.split(' ').filter(function (n) { return n != '' }).length === 0) {
          this.ingredientFlag = false;
        } else {
          this.ingredientFlag = true;
          return;
        }
      });
    } else {
      this.ingredientFlag = false;
    }
  }

  checkStep() {
    if (this.steps && this.steps.length >= 1) {
      this.steps.map(step => {
        if (step.split(' ').filter(function (n) { return n != '' }).length === 0) {
          this.stepFlag = false;
        } else {
          this.stepFlag = true;
          return;
        }
      });
    } else {
      this.stepFlag = false;
    }
  }

  addIngredient() {
    this.iteratorIngredients.push("");
    this.ingredients.push("");
  }

  deleteIngredient(i) {
    this.iteratorIngredients.splice(i, 1);
    this.ingredients.splice(i, 1);
  }

  addStep() {
    this.iteratorSteps.push("");
    this.steps.push("");
  }

  deleteStep(i) {
    this.iteratorSteps.splice(i, 1);
    this.steps.splice(i, 1);
  }

  openUser() {
    this.navCtrl.push('my-page');
  }

  openSubcategory(value) {
    this.recipeCategory.map(res => {
      if (res._id === value) {
        this.selectedCategory = res;
        this.recipeCat = res.name;
        this.recipeSubcategory = res.subCategories;
        this.flag = true;
        this.categoryFlag = true;
      }
    });
    this.categoryFlag = true;
  }

  setPreferences(type, item) {
    if (type == 'health' && this.healthCount < 5 && this.localChips.indexOf(item.id) == -1) {
      this.addPreferenceCount(type, item);
    } else if (type == 'health' && this.localChips.indexOf(item.id) != -1) {
      this.removePreferenceCount(type, item);
    }
    else if (type == 'allergic' && this.allergicCount < 3 && this.localChips.indexOf(item.id) == -1) {
      this.addPreferenceCount(type, item);
    }
    else if (type == 'allergic' && this.localChips.indexOf(item.id) != -1) {
      this.removePreferenceCount(type, item);
    }
  }

  addPreferenceCount(type, item) {
    this[type + 'Count']++;
    this.localChips.push(item.id);
    this.chips.push(item);
  }

  removePreferenceCount(type, item) {
    this.chips.splice(this.chips.find(element => element.id == item.id), 1)
    this.localChips.splice(this.localChips.indexOf(item.id), 1);
    this[type + 'Count']--;
  }

  getAllPreferences() {
    // this.angFire.getPreferences().subscribe(data => {
    //   this.preferences = data;
    // });
  }

  getPreferenceTypeName(id) {
    return this.angValues.getPreferenceTypeName(id);
  }

  firstButtonClick() {
    this.firstButtonClicked = !this.firstButtonClicked;
  }

  secondButtonClick() {
    this.secondButtonClicked = !this.secondButtonClicked;
  }

  presentModal() {
    let optionModal = this.modalCtrl.create("camera-option-page", { flag: this.imageSelect });

    optionModal.present();
    optionModal.onWillDismiss(data => {
      if (data.flag !== false) {
        this.imageSelect = data.flag;
        this.imageFlag = true;
        this.image.push(data.image);
        this.img.push(data.blob);
      }
    });
  }

  sanitize(url) {
    return this._DomSanitizationService.bypassSecurityTrustUrl(url);
  }

  deleteImage(key) {
    let loader = this.loadingCtrl.create({
      content: "Please wait"
    });
    loader.present();
    this.image.splice(key, 1);
    this.img.splice(key, 1);
    if (this.image.length == 0 && this.img.length == 0) {
      this.imageFlag = false;
      this.imgFlag = false;
      this.cameraOption = false;
    }
    loader.dismiss();
  }

  getBusinesses(ev: any) {
    var val = ev.target.value;

    if (val.length) {
      this.searchList = true;
    } else {
      this.searchList = false;
    }

    if (val.length > 2) {
      const query = {
        name: val
      };
      
      this.angSearch.searchedBusinesses(query).subscribe(res => {
        this.businesses = res;
      }, err => {
        console.log(JSON.stringify(err));
      });
    } else {
      this.businesses = null;
    }
  }

  selectBusiness(key) {
    this.selectedBusinessId = key._id;
    this.selectedBusinessOption = true;
    this.selectedBusiness = key;
  }

  chooseBusiness() {
    this.business = "";

    if (this.business != "") {
      this.searchList = true;
    } else {
      this.searchList = false;
    }

    this.selectedBusinessOption = false;
    this.businessListsOption = true;

    if (this.businessLists.find(x => x._id === this.selectedBusinessId)) {
      this.businessLists.splice(this.businessLists.findIndex(x => x._id === this.selectedBusinessId), 1, this.selectedBusiness);
    } else {
      this.businessLists.push(this.selectedBusiness);
    }

    if (this.businessListsId.find(x => x === this.selectedBusinessId)) {
      this.businessListsId.splice(this.businessListsId.findIndex(x => x === this.selectedBusinessId), 1, this.selectedBusinessId);
    } else {
      this.businessListsId.push(this.selectedBusinessId);
    }
  }

  openSearch() {
    this.selectedBusinessOption = false;
    this.businesses = null;
  }

  addRecipe() {
    this.recipe.addedBy = this.uid;
    this.recipe.ingredients = this.ingredients;
    this.recipe.steps = this.steps;
    this.recipe.business = this.businessListsId;

    this.angRecipe.addRecipe(this.recipe).subscribe(recipe => {
      this.angUser.updateUserPoint(this.uid, this.addRecipePoints);
      this.recipe._id = recipe['recipe']._id;
      this.recipe.likes = recipe['recipe'].likes;
      let profileModal = this.modalCtrl.create('recipe-modal-page');
      profileModal.present();
      this.showRecipe();

      // Call image-upload function to upload images of recipe
      this.addRecipeImages();
    });
  }

  addRecipeImages() {
    this.img.forEach((image, index) => {
      this.uploadImage.uploadRecipeImages(this.recipe._id, image);
    });
  }

  showRecipe() {
    this.liked = false;
    this.isLiked = { id: null, flag: false };
    this.isBookmarked = { id: null, flag: false };
    
    setInterval(() => {
      this.switchFlag = true;
    }, 1000);
  }

  getSubcategory(subcatId) {
    this.selectedCategory.subCategories.map(subcat => {
      if (subcat._id === subcatId) this.recipeSubcat = subcat.name;
    });
    this.subcategoryFlag = true;
  }

  getUserName(id) {
    this.getUserLocation(id);
    return this.angValues.getUserName(id);
  }

  getUserLocation(id) {
    if (id) {
      this.count++;
      if (this.count === 1) {
        this.angLocation.getLocationFromZipcode(this.angValues.user.find(x => x.id === id).zipcode).then(data => {
          this.loc = data.city + ", " + data.state;
        }).catch(e => {
          this.loc = "USA"
        });
      }
    } else {
      this.loc = "USA";
    }
  }

  getUserImage(id) {
    return this.angValues.getUserImage(id);
  }

  openSlider(key) {
    this.slides.slideTo(key, 500);
  }

  like() {
    var count = document.getElementById('count').innerHTML;
    if (this.isLiked.flag === true) {
      var newCount = parseInt(count) - 1;
      document.getElementById('count').innerHTML = newCount.toString();
      this.isLiked.flag = !this.isLiked.flag;
    } else {
      var newCounts = parseInt(count) + 1;
      document.getElementById('count').innerHTML = newCounts.toString();
      this.isLiked.flag = !this.isLiked.flag;
    }
  }

  bookmark() {
    this.storage.get('userData').then(user => {
      if (this.isBookmarked.flag === true) {
        var recipeSchema = {
          _id: this.isBookmarked.id,
          recipeId: this.recipe._id
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
        this.angBookmark.bookmarkRecipe(this.recipe._id, user._id).subscribe(res => {
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

  exploreRecipe(preference) {
    // let tagRcipeData: Subscription = this.angRecipe.getPreferenceRecipes(preference).subscribe(data => {
    //   tagRcipeData.unsubscribe();
    //   this.navCtrl.push('explore-tags-filter-page', {
    //     data: data,
    //     type: 'recipe',
    //     id: preference
    //   });
    // })
  }

  checkLength() {
    return this.ingredients.forEach(a => {
      if (a == '') {
        return false;
      }

      return true
    });

  }

  nextStep() {
    this.stepCount += 1;
    this.trackIndex = false;
    if (this.stepCount == 1) {
      if (this.nameFlag === true && this.categoryFlag === true && this.subcategoryFlag === true && this.ingredientFlag === true) {
        if (this.recipe.name && this.recipe.category && this.recipe.subCategory && this.ingredients.length >= 1) {
          if (this.ingredients[0].split(' ').filter(function (n) { return n != '' }).length === 0) {
            this.ingredientFlag = false;
            this.stepCount -= 1;
          } else {
            this.firstButtonClicked = !this.firstButtonClicked;
          }
        } else {
          if (!this.recipe.name) this.nameFlag = false;
          
          if (!this.recipe.category) this.categoryFlag = false;
          else {
            if (!this.recipe.subCategory) this.subcategoryFlag = false;
          }
          
          if (this.ingredients && this.ingredients.length >= 1) {
            if (this.ingredients[0].split(' ').filter(function (n) { return n != '' }).length === 0) {
              this.ingredientFlag = false;
            }
          } else {
            this.ingredientFlag = false;
          }
          this.stepCount -= 1;
        }
      } else {
        this.stepCount -= 1;
      }
    }
    if (this.stepCount == 2) {
      if (this.stepFlag === true) {
        if (this.steps && this.steps.length >= 1) {
          if (this.steps[0].split(' ').filter(function (n) { return n != '' }).length === 0) {
            this.stepFlag = false;
            this.stepCount -= 1;
          } else {
            this.secondButtonClicked = !this.secondButtonClicked;
          }
        } else {
          this.stepFlag = false;
          this.stepCount -= 1;
        }
      } else {
        this.stepCount -= 1;
      }
    }
    if (this.stepCount == 3) {
      this.thirdButtonClicked = !this.thirdButtonClicked;
    }
    // if (this.stepCount == 4) {
    //   this.forthButtonClicked = !this.forthButtonClicked;
    // }
    if (this.stepCount == 4) {
      if (this.imageFlag) {
        this.addRecipe();
        this.stepCount = 0;
      } else {
        this.stepCount -= 1;
        let alert = this.alertCtrl.create({
          title: 'Oops! Error occured',
          subTitle: 'You have to add images in order to add recipe',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    }
  }

  prevStep() {
    this.stepCount -= 1;
    // if (this.stepCount == 3) {
    //   this.forthButtonClicked = !this.forthButtonClicked;
    // }
    if (this.stepCount == 2) {
      this.thirdButtonClicked = !this.thirdButtonClicked;
    }
    if (this.stepCount == 1) {
      this.secondButtonClicked = !this.secondButtonClicked;
    }
    if (this.stepCount == 0) {
      this.firstButtonClicked = !this.firstButtonClicked;
    }
    if (this.stepCount == -1) {
      this.navCtrl.pop();
    }
    this.trackIndex = false;
  }
}