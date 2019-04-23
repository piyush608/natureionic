import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Platform, Slides, ToastController } from "ionic-angular";
import { FireProvider } from "./../../providers/fire/fire";
import { Camera } from "@ionic-native/camera";
import { UploadImageProvider } from "../../providers/upload-image/upload-image";
import { AuthProvider } from "../../providers/auth/auth";
import { HuntedProductProvider } from "../../providers/hunted-product/hunted-product";
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from "../../models/product.model";
import { ValuesProvider } from '../../providers/values/values';
import { LocationProvider } from "../../providers/location/location";
import { BookmarkProvider } from '../../providers/bookmark/bookmark';
import { UserProvider } from '../../providers/user/user';
import dataUriToBuffer from 'data-uri-to-buffer';
import { User } from '../../models/user.model';
import { CategoryProvider } from '../../providers/category/category';
import { LikeProvider } from "../../providers/like/like";
import { BASE_URL } from "../../app/app.url.config";
import * as io from 'socket.io-client';
import { Storage } from "@ionic/storage";

@IonicPage({
  name: 'add-product-page',
  segment: 'add-product'
})
@Component({
  selector: 'page-add-products',
  templateUrl: 'add-products.html',
})
export class AddProductsPage {
  // All variables
  @ViewChild(Slides) slides: Slides;
  public productCat: string;
  public productSubcat: string;
  
  public count: number = 0;
  public loc: string;
  private socket: any;
  
  public productSubCategories: any;
  public selectedCategory: any;

  // Boolean variables
  public switchFlag: boolean = false;
  public cameraOption: boolean = false;
  public liked: boolean;

  // Object Variables
  public isLiked: {
    id: string,
    flag: boolean
  };
  public isBookmarked: {
    id: string,
    flag: boolean
  };

  // Two-way binding variables
  public product = new Product();
  public user = new User();

  // Validation variables
  nameFlag: boolean = true;
  nameText: string = 'Name is required';
  categoryFlag: boolean = true;
  categoryText: string = 'Category is required';
  subcategoryFlag: boolean = true;
  subcategoryText: string = 'Subcategory is required';
  descriptionFlag: boolean = true;
  descriptionText: string = 'Description is required';
  founderFlag: boolean = true;
  founderText: string = 'Founder info is required';
  founderDescriptionFlag: boolean = true;
  founderDescriptionText: string = 'Founder description is required';

  public uid: any;
  public image = [];
  public img = [];
  
  public logo;
  public cameraLogo;
  public logoUrl;
  
  public tabsElement: any;
  public firstButtonClicked: boolean = false;
  public secondButtonClicked: boolean = false;
  public thirdButtonClicked: boolean = false;
  public fourthButtonClicked: boolean = false;
  public stepCount: number = 0;

  public flag: boolean = false;
  public productCategories: any;
  public productFormValid: boolean = true;
  public founderFormValid: boolean = true;
  public imageValid: boolean = true;
  public logoValid: boolean = true;

  public imageSelect;
  public logoSelect;
  public imageFlag: boolean = false;
  public logoFlag: boolean = false;
  public addProductPoints;
  public userPoints;
  public currentLocation: {
    city: string,
    state: string
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public uploadImage: UploadImageProvider,
    public angFireAuth: AuthProvider,
    public angFire: FireProvider,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private camera: Camera,
    private angProduct: HuntedProductProvider,
    private platform: Platform,
    private _DomSanitizationService: DomSanitizer,
    private angValues: ValuesProvider,
    private angLocation: LocationProvider,
    private angBookmark: BookmarkProvider,
    public toastCtrl: ToastController,
    private angUser: UserProvider,
    private angCategory: CategoryProvider,
    private angLike: LikeProvider,
    private storage: Storage
  ) {
    // Tabs controler
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");

    this.storage.get('userData').then(user => {
      this.uid = user._id;
      this.userPoints = user.points;

      this.socket = io(BASE_URL);
      this.user = user;

      this.angLocation.getLocationFromZipcode(user.zipcode.toString()).then(loc => {
        this.currentLocation = loc;
      });
    });

    this.storage.get('pointSystems').then(res => {
      res.map(data => {
        if (data.query === 'add_huntedProduct') {
          this.addProductPoints = data.point;
        } else {
          this.addProductPoints = 5;
        }
      });
    });
  }

  ngOnInit() {
    this.angCategory.getProductCategories().subscribe(res => {
      this.productCategories = res;
    }, err => {
      console.log(JSON.stringify(err));
    });
  }

  openSubcategory(value) {
    this.productCategories.map(res => {
      if (res._id === value) {
        this.productSubCategories = res.subCategories;
        this.flag = true;
      }
    });
    this.getCategoryName(value);
    this.product.category = value;
    this.categoryFlag = true;
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
          this.angLike.likeHuntedProduct(this.product._id, user._id).subscribe(res => {
            this.socket.emit('likeHuntedProduct', { data: 'Like Hunted Product Emitted' });
          }, err => {
            console.log(JSON.stringify(err));
          });
        });
      }
    }
  }

  checkName() {
    if (this.product.name.length > 0) {
      if (this.product.name.split(' ').filter(function (n) { return n != '' }).length === 0) {
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

  checkDescription() {
    if (this.product.description.length > 0) {
      if (this.product.description.split(' ').filter(function (n) { return n != '' }).length === 0) {
        this.descriptionFlag = false;
        this.descriptionText = 'Must contain atleast twenty characters';
      } else {
        if (this.product.description.trim().length > 20) {
          this.descriptionFlag = true;
        } else {
          this.descriptionFlag = false;
          this.descriptionText = 'Must contain atleast twenty characters';
        }
      }
    } else {
      this.descriptionFlag = false;
      this.descriptionText = 'Description is required';
    }
  }

  checkFounder() {
    if (this.product.founderName.length > 0) {
      if (this.product.founderName.split(' ').filter(function (n) { return n != '' }).length === 0) {
        this.founderFlag = false;
        this.founderText = 'Must contain atleast one character';
      } else {
        this.founderFlag = true;
      }
    } else {
      this.founderFlag = false;
      this.founderText = 'Founder name is required';
    }
  }

  openUser() {
    this.navCtrl.push('my-page');
  }

  checkFounderDescription() {
    if (this.product.founderDescription.length > 0) {
      if (this.product.founderDescription.split(' ').filter(function (n) { return n != '' }).length === 0) {
        this.founderDescriptionFlag = false;
        this.founderDescriptionText = 'Must contain atleast twenty characters';
      } else {
        if (this.product.founderDescription.trim().length > 20) {
          this.founderDescriptionFlag = true;
        } else {
          this.founderDescriptionFlag = false;
          this.founderDescriptionText = 'Must contain atleast twenty characters';
        }
      }
    } else {
      this.founderDescriptionFlag = false;
      this.founderDescriptionText = 'Founder description is required';
    }
  }

  addProduct() {
    let profileModal = this.modalCtrl.create('hunted-product-modal-page');
    profileModal.present();

    this.product.addedBy = this.uid;
    this.angProduct.addHuntedProduct(this.product).subscribe(product => {
      this.angUser.updateUserPoint(this.uid, this.addProductPoints);
      this.product._id = product['huntedProduct']._id;
      this.product.likes = product['huntedProduct'].likes;

      // Call image-upload function to upload images of product
      this.addProductImages();
      this.addProductLogo();
    }, err => {
      console.log(JSON.stringify(err))
    });

    this.showProduct();
  }

  showProduct() {
    this.liked = false;
    this.isLiked = { id: null, flag: false };
    this.isBookmarked = { id: null, flag: false };

    setInterval(() => {
      this.switchFlag = true;
    }, 1000);
  }

  getCategoryName(id) {
    this.productCategories.map(res => {
      if (res._id === id) {
        this.selectedCategory = res;
        this.productCat = res.name;
      }
    });
  }

  getSubcategory(subcatId) {
    this.selectedCategory.subCategories.map(subcat => {
      if (subcat._id === subcatId) this.productSubcat = subcat.name;
    });
    this.product.subCategory = subcatId;
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
        var huntedProductSchema = {
          _id: this.isBookmarked.id,
          huntedProductId: this.product._id
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
        this.angBookmark.bookmarkProduct(this.product._id, user._id).subscribe(res => {
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

  showToast() {
    let toast = this.toastCtrl.create({
      message: "You'll be notified when the product is available.",
      showCloseButton: true,
      closeButtonText: "Ok"
    });
    
    toast.onDidDismiss(() => {
      toast.dismiss();
    });
    toast.present();
  }

  addProductLogo() {
    this.uploadImage.uploadhuntedProductOwnerLogo(this.product._id, this.cameraLogo);
  }

  addProductImages() {
    this.img.forEach((image, index) => {
      this.uploadImage.uploadhuntedProductImages(this.product._id, image);
    });
  }

  sanitize(url) {
    return this._DomSanitizationService.bypassSecurityTrustUrl(url);
  }

  imageModal() {
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

  logoModal() {
    let optionModal = this.modalCtrl.create("camera-option-page");

    optionModal.present();
    optionModal.onWillDismiss(data => {
      if (data.flag !== false) {
        this.logoFlag = true;
        this.logoValid = true;
        this.logoUrl = data.image;
        this.cameraLogo = data.blob;
      }
    });
  }

  deleteImage(key) {
    let loader = this.loadingCtrl.create({
      content: "Please wait"
    });
    loader.present();
    this.image.splice(key, 1);
    this.img.splice(key, 1);
    if (this.image.length == 0 && this.img.length ==0) {
      this.imageFlag = false;
      this.logoFlag = false;
      this.cameraOption = false;
    }
    this.logo = '';
    this.cameraLogo = '';
    this.logoUrl = '';
    loader.dismiss();
  }

  deleteLogo(key) {
    let loader = this.loadingCtrl.create({
      content: "Please wait"
    });
    loader.present();
    this.logo = '';
    this.cameraLogo = '';
    this.logoUrl = '';
    if(!this.logoUrl && !this.cameraLogo && !this.logo){
      this.imageFlag = false;
      this.logoFlag = false;
    }
    loader.dismiss();
  }

  prevStep() {
    this.stepCount -= 1;
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
  }

  nextStep() {
    this.stepCount += 1;
    if (this.stepCount == 1) {
      if (this.nameFlag === true && this.categoryFlag === true && this.subcategoryFlag === true && this.descriptionFlag === true) {
        if (this.product.name && this.product.category && this.product.subCategory && this.product.description) {
          this.firstButtonClicked = !this.firstButtonClicked;
        } else {
          if (!this.product.name) this.nameFlag = false;
          if (!this.product.category) this.categoryFlag = false;
          if (!this.product.subCategory) this.subcategoryFlag = false;
          if (!this.product.description) this.descriptionFlag = false;
          this.stepCount -= 1;
        }
      } else {
        this.stepCount -= 1;
      }
    }
    if (this.stepCount == 2) {
      if (this.imageFlag) {
        this.secondButtonClicked = !this.secondButtonClicked;
        this.imageValid = true;
      } else {
        this.imageValid = false;
        this.stepCount -= 1;
      }
     }
    if (this.stepCount == 3) {
      if (this.founderFlag === true && this.founderDescriptionFlag === true) {
        if (this.product.founderName && this.product.founderDescription) {
          this.thirdButtonClicked = !this.thirdButtonClicked;
        } else {
          if (!this.product.founderName) this.founderFlag = false;
          if (!this.product.founderDescription) this.founderDescriptionFlag = false;
        }
      } else {
        this.stepCount -= 1;
      }
    }
    if (this.stepCount == 4) {
      if (this.logoFlag) {
        this.addProduct();
        this.stepCount = 0;
      } else {
        this.logoValid = false;
        this.stepCount -= 1;
      }
    }
  }
}
