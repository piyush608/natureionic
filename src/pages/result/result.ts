import { FireProvider } from "../../providers/fire/fire";
import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SearchProvider } from "../../providers/search/search";
import { UserProvider } from "../../providers/user/user";
import { Storage } from "@ionic/storage";

@IonicPage({
  name: "result-page",
  segment: "result"
})
@Component({
  selector: "page-result",
  templateUrl: "result.html"
})
export class ResultPage implements OnInit {
  public tabsElement: any;
  public searchQuery: string;
  public businesses: any;
  public recipes: any;
  public users: any;
  public products: any;
  public options;
  public searchKeyword: any;

  // boolean variables
  public flag: boolean = true;
  public businessesResultFlag: boolean = true;
  public recipesResultFlag: boolean = false;
  public huntedProductsResultFlag: boolean = true;
  public usersResultFlag: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public angSearch: SearchProvider,
    public angFire: FireProvider,
    private angUser: UserProvider,
    private storage: Storage
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");

    if (this.navParams.get("query")) {
      this.searchQuery = this.navParams.get("query");
      this.createKeyword();
    } else {
      this.searchKeyword = this.navParams.get("searchKeyword");
      this.searchQuery = this.searchKeyword.query;
      this.updateKeyword();
    }

    this.getResults();
  }

  ngOnInit() {
    if (this.flag === true) {
      setInterval(() => {
        if (
          this.businessesResultFlag === true &&
          this.recipesResultFlag === true &&
          this.huntedProductsResultFlag === true &&
          this.usersResultFlag === true
        )
          this.flag = false;
      }, 1500);
    }
  }

  createKeyword() {
    this.angSearch
      .searchedExistsKeywords({ name: this.searchQuery.toLowerCase() })
      .subscribe(
        res => {
          if (res && res.toString()) {
            this.searchKeyword = res;
            this.updateKeyword();
          } else {
            this.angSearch
              .createKeyword({ query: this.searchQuery.toLowerCase() })
              .subscribe(
                res => {
                  this.updateUser(res["search"]._id);
                },
                err => {
                  console.log(JSON.stringify(err));
                }
              );
          }
        },
        err => {
          console.log(JSON.stringify(err) + " d");
          this.angSearch
            .createKeyword({ query: this.searchQuery.toLowerCase() })
            .subscribe(
              res => {
                this.updateUser(res["search"]._id);
              },
              err => {
                console.log(JSON.stringify(err));
              }
            );
        }
      );
  }

  updateKeyword() {
    this.angSearch.updateKeyword(this.searchKeyword._id).subscribe(
      res => {
        this.updateUser(this.searchKeyword._id);
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }

  updateUser(keywordId) {
    this.storage.get("userData").then(user => {
      let ifExixts = false;

      this.angUser.getSearchedHistory().subscribe(res => {
        if (res["search"].search.length > 0) {
          for (var i = 0; i < res["search"].search.length; i++) {
            if (res["search"].search[i]._id === keywordId) {
              ifExixts = true;
              break;
            }
          }

          if (i >= res["search"].search.length && ifExixts === false) {
            const keyword = {
              keywordId: keywordId
            };
            this.angUser.createUserSearch(user._id, keyword).subscribe(
              res => {
                this.angUser.getUserDetails();
              },
              err => {
                console.log(JSON.stringify(err));
              }
            );
          }
        } else {
          const keyword = {
            keywordId: keywordId
          };
          this.angUser.createUserSearch(user._id, keyword).subscribe(
            res => {
              this.angUser.getUserDetails();
            },
            err => {
              console.log(JSON.stringify(err));
            }
          );
        }
      });
    });
  }

  getResults() {
    const query = {
      name: this.searchQuery
    };

    this.angSearch.searchedBusinesses(query).subscribe(res => {
      this.businesses = res;
    });

    this.angSearch.searchedRecipes(query).subscribe(res => {
      this.recipes = res;
    });

    this.angSearch.searchedHuntedProducts(query).subscribe(res => {
      this.products = res;
    });

    this.angSearch.searchedUsers(query).subscribe(res => {
      this.users = res;
    });
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";
  }

  homePage() {
    if (this.navCtrl.canGoBack()) this.navCtrl.pop();
    else this.navCtrl.setRoot("search-page");
  }

  searchPage() {
    this.navCtrl.push("search-page", { query: this.searchQuery });
  }
}
