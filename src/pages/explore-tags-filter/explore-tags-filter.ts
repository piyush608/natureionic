import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { RecipeProvider } from "../../providers/recipe/recipe";
import { BusinessProvider } from "../../providers/business/business";
import { HuntedProductProvider } from "../../providers/hunted-product/hunted-product";
import { ValuesProvider } from '../../providers/values/values';
import { Subscription } from "rxjs/Subscription";

@IonicPage({
  name: "explore-tags-filter-page",
  segment: "explore-tags-filter"
})

@Component({
  selector: 'page-explore-tags-filter',
  templateUrl: 'explore-tags-filter.html',
})
export class ExploreTagsFilterPage {

  tabsElement;

  getIds;
  type;
  options

  recipeCategory;
  items = [];
  filteredItems = 'all';
  count = 1;
  id;
  preference

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public recipeService: RecipeProvider,
    public productService: HuntedProductProvider,
    public businessService: BusinessProvider,
    private angValues: ValuesProvider) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");

    this.getIds = navParams.get('data');
    this.type = navParams.get('type');
    this.id =  navParams.get('id')

    this.getPreferenceTypeName();

    this.getIds.forEach(element => {
      this.options = {
        id:element.id
      };
        this.getData(this.type, 'recipes', 'recipeCategory', 'getFieldValues');
    });

  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";
  }

  getPreferenceTypeName() {
    this.preference =  this.angValues.getPreferenceTypeName(this.id);
  }


  getData(type, dataFunction, dataCategory, fieldValues) {
   
    this.recipeCategory = this.angValues.recipeCategory;
    let generalData:Subscription = this[type + 'Service'][dataFunction](this.options).subscribe(data => {
      generalData.unsubscribe();
      
      if(!data) return

      data.map(d =>{  
      if (this.items.find(x => x.id === d.id)) {
          if (d.name) this.items.splice(this.items.findIndex(x => x.id === d.id), 1, d);
        } else {
          if (d.name) this.items.push(d);
        }
      });
    });
    fieldValues?this[type + 'Service'][fieldValues](this.count):'';
  }


  filter(data) {
    this.filteredItems = data;
  }

  prevStep() {
    this.navCtrl.pop();
  }

}