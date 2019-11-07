import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.component.html",
  styleUrls: ["./onboarding.component.scss"]
})
export class OnboardingComponent implements OnInit {
  public user = new User();
  public firstTab: boolean = true;
  public secondTab: boolean = false;
  public thirdTab: boolean = false;
  public fourthTab: boolean = false;
  public tabIndex: number = 1;
  public types = {
    conscious: false,
    cityExplore: false,
    diet: false,
    foodie: false,
    greenThumb: false,
    activist: false,
    parent: false,
    healthEnthusiast: false,
    yogi: false
  };

  public topics = {
    nutrition: false,
    localBusiness: false,
    sustainability: false,
    health: false,
    activity: false,
    gardening: false,
    diy: false,
    fashion: false,
    people: false
  };

  public dietPreferences = {
    organic: false,
    nonGMO: false,
    vegan: false,
    vegeterian: false,
    detox: false,
    paleo: false,
    herbal: false,
    ayurveda: false,
    kosher: false,
    probiotic: false,
    gluten: false,
    free: false,
    dairyFree: false,
    sugarFree: false,
    saltFree: false,
    alcoholFree: false,
    yeastFree: false,
    diabetesFriendly: false,
    cholesterolFriendly: false,
    cancerFighting: false,
    lowCalorie: false,
    lowSodium: false,
    lowGI: false,
    lowSugar: false,
    lowFat: false,
    highProtein: false,
    highFiber: false
  };

  public foodAlergies = {
    peanutsFree: false,
    nutsFree: false,
    webConferencing: false,
    milkFree: false,
    eggFree: false,
    whearFree: false,
    soyFree: false,
    fishFree: false,
    seafoodFree: false,
    shelifishFree: false,
    pepperFree: false,
    hypoallergenic: false,
    fragranceFree: false
  };

  constructor(
    private angAuth: AuthService,
    private angUser: UserService,
    public router: Router
  ) {}

  ngOnInit() {}

  selectTypes(type) {
    this.types[type] = !this.types[type];
  }

  selectTopics(topic) {
    this.topics[topic] = !this.topics[topic];
  }

  selectDiet(diet) {
    this.dietPreferences[diet] = !this.dietPreferences[diet];
  }

  selectAlergies(alergy) {
    this.foodAlergies[alergy] = !this.foodAlergies[alergy];
  }

  submit() {
    this.user.types = this.types;
    this.user.topics = this.topics;
    this.user.dietPreference = this.dietPreferences;
    this.user.foodAlergies = this.foodAlergies;

    this.angAuth.setToken(this.angAuth.getPendingToken());

    this.angUser.update(this.angAuth.getUserPayload().id, this.user).subscribe(
      res => {
        this.router.navigateByUrl("/");
      },
      err => {
        console.log(err);
      }
    );
  }

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
