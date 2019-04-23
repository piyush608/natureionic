import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from "ionic-angular";
import { LevelsProvider } from '../../providers/levels/levels';
import { Level } from '../../models/level.model';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user/user';

@IonicPage({
  name: 'points-page',
  segment: 'points'
})
@Component({
  selector: 'page-points',
  templateUrl: 'points.html',
})
export class PointsPage implements OnInit {
  // All variables
  public tabsElement: any;
  public currentPoints: any;
  public levels: any;

  // Two-way binding variables
  public userLevel = new Level();

  // Boolean variables
  public flag: boolean = true;

  constructor(
    public navCtrl: NavController,
    private angLevels: LevelsProvider,
    private storage: Storage,
    private angUser: UserProvider
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
  }

  ngOnInit() {
    this.storage.get('userData').then(user => {
      this.angUser.getUserPoints(user._id).subscribe(res => {
        this.currentPoints = res['points'].points;
        let points = res['points'].points === 0 ? 1 : res['points'].points;
        this.angLevels.getUserLevel(points).subscribe(data => {
          this.userLevel = data as Level;
          this.flag = false;
        }, err => {
          console.log(JSON.stringify(err));
        });
      });
    });

    this.angLevels.getLevels().subscribe(res => {
      this.levels = res;
    }, err => {
      console.log(JSON.stringify(err));
    })
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";
  }

  getDefaultImg() {
    return "assets/imgs/badgeNextLevel.svg"
  }

  prevStep() {
    this.navCtrl.pop();
  }
}