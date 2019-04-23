import { Component, OnInit, Renderer } from "@angular/core";
import { IonicPage, NavController, ModalController, ActionSheetController } from "ionic-angular";
import { ForumProvider } from '../../providers/forum/forum';
import { SearchProvider } from '../../providers/search/search';

@IonicPage({
  name: "inspiration-page",
  segment: "inspiration"
})
@Component({
  selector: "page-inspiration",
  templateUrl: "inspiration.html"
})
export class InspirationPage implements OnInit {
  // All variables
  public trendingForums: any;
  public latestForums: any;
  public latestVideos: any;
  public searchedForums: any;

  // Flags variables
  public flag: boolean = true;
  public trendingFlag: boolean = false;
  public latestFlag: boolean = false;
  public searchList: boolean = false;

  constructor(
    public navCtrl: NavController,
    private angForum: ForumProvider,
    public modalCtrl: ModalController,
    private angSearch: SearchProvider,
    private renderer: Renderer,
    public actionSheetCtrl: ActionSheetController
  ) {
  }

  doRefresh(refresher) {
    this.navCtrl.setRoot('inspiration-page');

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  ngOnInit() {
    this.angForum.getLatestForums().subscribe(res => {
      if (res && res.toString()) {
        this.latestForums = res;
        this.flag = false;
      } else {
        this.latestForums = [];
      }
    }, err => {
      console.log(JSON.stringify(err));
    });

    this.angForum.getTrendingForums().subscribe(res => {
      if (res && res.toString()) {
        this.trendingForums = res;
        this.flag = false;
      } else {
        this.trendingForums = [];
      }
    }, err => {
      console.log(JSON.stringify(err));
    });
  }

  ionViewWillLeave() {
    this.searchList = false;
    this.searchedForums = [];
  }

  viewAllTopics(flag) {
    if (flag === 'trending') this.navCtrl.push('discussions-page', { 'flag': flag, 'forums': this.trendingForums });
    else this.navCtrl.push('discussions-page', { 'flag': flag, 'forums': this.latestForums });
  }

  selectOption() {
    this.navCtrl.push('add-forum-page');
  }

  getItems(event) {
    var code = event.keyCode || event.which;

    if (event.target.value.length >= 2) {
      const query = {
        name: event.target.value
      };
      this.angSearch.searchedForums(query).subscribe(res => {
        this.searchList = true;
        this.searchedForums = res;
      }, err => {
        this.searchList = true;
      });
    } else {
      this.searchList = false;
    }

    if (code === 13) {
      this.renderer.invokeElementMethod(event.target, 'blur');
    }
  }
}