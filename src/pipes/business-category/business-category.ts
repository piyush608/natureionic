import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'businessCategory',
})
export class BusinessCategoryPipe implements PipeTransform {
  
  transform(businesses: any, category: string): any {
    // If filter is all
    if(category === 'all') return businesses;
    // Return updated businesses
    return businesses.filter(function(business) {
      if(business.category._id === category) return business;
    });
  }
}
