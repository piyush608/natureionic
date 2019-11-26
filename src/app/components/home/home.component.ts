import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from "@angular/core";
import { RecipeService } from "src/app/services/recipe.service";
import { ProductService } from "src/app/services/product.service";
import { CategoryService } from "src/app/services/category.service";
import { Router } from "@angular/router";
import { LocationService } from "src/app/services/location.service";
import { UserService } from "src/app/services/user.service";
import { MapsAPILoader } from "@agm/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  @ViewChild("search", { static: false }) public searchElementRef: ElementRef;
  public city: string;
  public state: string;
  public country: string;
  public place: string;
  public username: string;
  public categories = [];
  public recipes = [];
  public products = [];

  constructor(
    private angRecipe: RecipeService,
    private angProduct: ProductService,
    private angCategory: CategoryService,
    private router: Router,
    private angLocation: LocationService,
    private angUser: UserService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.getCurrentPosition();
    this.getUserName();

    this.angCategory.getCategories("business").subscribe(
      res => {
        this.categories = res["categories"];
      },
      err => {
        console.log(err);
      }
    );

    this.angRecipe.getPopular().subscribe(
      res => {
        this.recipes = res["recipes"];
      },
      err => {
        console.log(err);
      }
    );

    this.angProduct.getPopular().subscribe(
      res => {
        this.products = res["products"];
      },
      err => {
        console.log(err);
      }
    );

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["(cities)"]
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // Set latitude, longitude
          this.getLatLngCode(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );
        });
      });
    });
  }

  getCurrentPosition() {
    this.angLocation.getPosition().then(res => {
      this.getLatLngCode(res._lat, res._long);
    });
  }

  getUserName() {
    this.angUser.getProfileImage().subscribe(
      res => {
        this.username = res["user"].name.split(" ")[0];
      },
      err => {
        console.log(err);
      }
    );
  }

  getLatLngCode(lat, lng) {
    this.angLocation
      .codeLatLng(lat, lng)
      .then(location => {
        this.city = location.city;
        this.state = location.stateSN;
        this.country = location.country;
        this.place = this.city + ", " + this.state;
      })
      .catch(err => {
        console.log(err);
      });
  }

  addBusiness() {
    this.router.navigateByUrl("/add/business");
  }

  addRecipe() {
    this.router.navigateByUrl("/add/recipe");
  }

  addProduct() {
    this.router.navigateByUrl("/add/product");
  }

  addList() {
    this.router.navigateByUrl("/add/list");
  }

  exploreRecipes() {
    this.router.navigateByUrl("/explore/recipe");
  }
}
