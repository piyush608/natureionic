import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.component.html",
  styleUrls: ["./onboarding.component.scss"]
})
export class OnboardingComponent implements OnInit {
  public firstTab: boolean = true;
  public secondTab: boolean = false;
  public thirdTab: boolean = false;
  public fourthTab: boolean = false;
  public tabIndex: number = 1;

  constructor() {}

  ngOnInit() {}

  submit() {}

  nextStep() {
    if (this.tabIndex === 1) this.showSecondTab();
    else if (this.tabIndex === 2) this.showThirdTab();
    else if (this.tabIndex === 3) this.showFourthTab();
    else if (this.tabIndex === 4) this.submit();
  }

  showFirstTab() {
    this.firstTab = true;
    this.secondTab = false;
    this.thirdTab = false;
    this.fourthTab = false;
    this.tabIndex = 1;
  }

  showSecondTab() {
    this.firstTab = false;
    this.secondTab = true;
    this.thirdTab = false;
    this.fourthTab = false;
    this.tabIndex = 2;
  }

  showThirdTab() {
    this.firstTab = false;
    this.secondTab = false;
    this.thirdTab = true;
    this.fourthTab = false;
    this.tabIndex = 3;
  }

  showFourthTab() {
    this.firstTab = false;
    this.secondTab = false;
    this.thirdTab = false;
    this.fourthTab = true;
    this.tabIndex = 4;
  }
}
