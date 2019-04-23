import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { SearchProvider } from "../../providers/search/search";
import { HomePage } from "../home/home";
import { UserProvider } from "../../providers/user/user";

@IonicPage({
  name: "search-page",
  segment: "search"
})
@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage {
  public tabsElement: any;
  public resultItems: any;
  public searchList: boolean = false;
  public myInput: string;

  public popularKeywords: any;
  public recentSearch = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public angSearch: SearchProvider,
    private platform: Platform,
    private angUser: UserProvider
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
    this.myInput = this.navParams.get("query");
  }

  ngOnInit() {
    this.angSearch.getTopSearches().subscribe(
      res => {
        this.popularKeywords = res;
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );

    this.angUser.getSearchedHistory().subscribe(
      res => {
        this.recentSearch = res["search"].search;
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }

  ionViewDidLoad() {
    this.platform.registerBackButtonAction(() => {
      this.homePage();
    });
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";
  }

  homePage() {
    if (this.navCtrl.canGoBack()) this.navCtrl.popToRoot();
    else this.navCtrl.setRoot(HomePage);
  }

  getItems(ev: any) {
    this.myInput = ev.target.value;
    if (this.myInput.length) {
      this.searchList = true;
    } else {
      this.searchList = false;
    }

    let options = {
      name: this.myInput
    };
    this.angSearch.searchedKeywords(options).subscribe(
      res => {
        this.resultItems = res;
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }

  getResult(searchQuery?: string) {
    if (searchQuery)
      this.navCtrl.push("result-page", { searchKeyword: searchQuery });
    else this.navCtrl.push("result-page", { query: this.myInput });
  }
}
