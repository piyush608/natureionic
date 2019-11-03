import { Component, OnInit } from "@angular/core";
import { RecipeService } from "src/app/services/recipe.service";
import { Recipe } from "src/app/models/recipe.model";
import { CategoryService } from "src/app/services/category.service";
import { BusinessService } from "src/app/services/business.service";
import { ImageService } from "src/app/services/image.service";
import { SuccessModalComponent } from "../success-modal/success-modal.component";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-add-recipe",
  templateUrl: "./add-recipe.component.html",
  styleUrls: ["./add-recipe.component.scss"]
})
export class AddRecipeComponent implements OnInit {
  public recipe = new Recipe();
  public firstStep: boolean = true;
  public categories = [];
  public subcategories = [];
  public ingredients = [];
  public steps = [];
  public keyword: string;
  public isVisible: boolean = false;
  public result = [];
  public files = [];
  public localFiles = [];

  constructor(
    private angRecipe: RecipeService,
    private angCategory: CategoryService,
    private angBusiness: BusinessService,
    private angImage: ImageService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.ingredients.push("");
    this.steps.push("");

    this.getCategories();
  }

  getCategories() {
    this.angCategory.getCategories("recipe").subscribe(
      res => {
        this.categories = res["categories"];
      },
      err => {
        console.log(err);
      }
    );
  }

  getSubcategories(_id) {
    this.subcategories = this.categories[
      this.categories.findIndex(category => category._id === _id)
    ].subcategories;
  }

  toggleStep() {
    this.firstStep = !this.firstStep;
  }

  addIngredient() {
    this.ingredients.push("");
  }

  addStep() {
    this.steps.push("");
  }

  searchBusiness() {
    if (this.keyword.length >= 2) {
      this.isVisible = true;
      this.angBusiness.search(this.keyword).subscribe(
        res => {
          this.result = res["businesses"];
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.isVisible = false;
    }
  }

  uploadImage(event) {
    const file = event.target.files[0];
    if (file) {
      this.files.push(file);

      // code for file preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.localFiles.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  addRecipe() {
    this.angRecipe.addRecipe(this.recipe).subscribe(
      res => {
        this.recipe = res["newRecipe"];

        this.files.forEach(file => {
          this.angImage
            .uploadImage("recipes", res["newRecipe"]._id, file)
            .then(url => {
              this.getImageRef(url);
            })
            .catch(err => {
              console.log(err);
            });
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  getImageRef(URL) {
    this.angImage.uploadImageURL(URL).subscribe(
      res => {
        this.recipe.photos.push(res["photo"]._id);
        const filename = res["photo"].originalUrl.split("/");
        const params = {
          path: res["photo"].originalUrl,
          key: "recipes/" + this.recipe._id + "/",
          filename: filename[filename.length - 1]
        };
        this.angImage.resizeImage(params).subscribe(
          resp => {
            console.log(resp);
          },
          err => {
            console.log(err);
          }
        );

        if (this.recipe.photos.length === this.files.length) {
          this.angRecipe.update(this.recipe._id, this.recipe).subscribe(
            () => {
              this.presentModal();
            },
            err => {
              console.log(err);
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SuccessModalComponent
    });
    return await modal.present();
  }
}
