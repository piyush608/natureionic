import { BusinessProvider } from './../../providers/business/business';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'business-category-card',
  templateUrl: 'business-category-card.html'
})
export class BusinessCategoryCardComponent implements OnInit {
  @Input('category') category;
  @Input('city') city: string;
  businesses: any;

  constructor(private angBusiness: BusinessProvider) {
  }

  ngOnInit() {
    this.angBusiness.getCategoryBusinesses(this.category._id, this.city).subscribe(res => {
      this.businesses = res;
    }, err => {
      console.log(JSON.stringify(err));
    });
  }
}