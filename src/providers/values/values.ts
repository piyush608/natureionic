import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ValuesProvider {
  public forumTags = [];
  public recipeCategory: any;
  public productCategory: any;
  public recipeSubcategory = [];
  public productSubcategory = [];
  public user: any;
  public preferences:any;
  public preferencesType:any;

  constructor(public http: HttpClient) {}

  getPreferenceTypeName(id){
    if (this.preferencesType) {
      if (this.preferencesType.find(x => x.id === id)) return this.preferencesType.find(x => x.id === id).name
      else return null;
    }
  }

  getRecipeCategoryName(id) {
    if (this.recipeCategory) {
      if (this.recipeCategory.find(x => x.id === id)) return this.recipeCategory.find(x => x.id === id).name
      else return null;
    }
  }

  getRecipeSubcategories(catId) {
    if (this.recipeSubcategory) {
      return this.recipeSubcategory.map(res => {
        if(res.catId === catId) return res
      });
    }
  }

  getForumTag(id) {
    if (this.forumTags) {
      if (this.forumTags.find(x => x.id === id)) return this.forumTags.find(x => x.id === id).name
      else return null;
    }
  }

  getTagName(id) {
    if(this.preferences){
      if(this.preferences.find(x => x.id === id)) return this.preferences.find(x => x.id === id).name
      else return null;
    }
  }

  getRecipeSubcategoryName(subCatId) {
    if(this.recipeSubcategory) {
      if(this.recipeSubcategory.find(x => x.id === subCatId)) return this.recipeSubcategory.find(x => x.id === subCatId).name
      else return null;
    }
  }

  getProductCategoryName(id) {
    if (this.productCategory) {
      if (this.productCategory.find(x => x.id === id)) return this.productCategory.find(x => x.id === id).name
      else return null;
    }
  }

  getProductSubcategories(catId) {
    if (this.productSubcategory) {
      return this.productSubcategory.map(res => {
        if(res.catId === catId) return res
      });
    }
  }

  getProductSubcategoryName(subCatId) {
    if(this.productSubcategory) {
      if(this.productSubcategory.find(x => x.id === subCatId)) return this.productSubcategory.find(x => x.id === subCatId).name
      else return null;
    }
  }

  getUserName(id) {
    if (this.user) {
      if (this.user.find(x => x.id === id)) return this.user.find(x => x.id === id).name
      else return "Naturehub Staff";
    }
  }

  getUserImage(id) {
    if (this.user) {
      if (this.user.find(x => x.id === id)) return this.user.find(x => x.id === id).profileImgUrl
      else return "assets/imgs/defaultIcon.png";
    }
  }
}