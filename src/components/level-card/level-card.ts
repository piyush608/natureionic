import { Component, Input } from '@angular/core';
import { LevelsProvider } from '../../providers/levels/levels';
import { Level } from '../../models/level.model';

@Component({
  selector: 'level-card',
  templateUrl: 'level-card.html'
})
export class LevelCardComponent {
  @Input('points') points: any;
  level = new Level();
  flag: boolean = true;
  userLevel: any;

  constructor(private angLevels: LevelsProvider) {
  }

  ngOnInit() {
    console.log(this.points);
    this.angLevels.getUserLevel(this.points).subscribe(data => {
      console.log(JSON.stringify(data));
      this.userLevel = data;
      this.flag = false;
    }, err => {
      console.log(JSON.stringify(err));
    });
  }
}