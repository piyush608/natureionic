import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'huntedProductCategory',
})
export class HuntedProductCategoryPipe implements PipeTransform {
  transform(products: any, category: string): any {
    // If filter is all
    if(category === 'all') return products;
    // Return updated products
    return products.filter(function(product) {
      if(product.category._id === category) return product;
    });
  }
}
