import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UiModule} from '@nagiub/ui'
import {OrdersModule} from '@nagiub/orders'
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { CatBanarComponent } from './components/cat-banar/cat-banar.component';
import {RouterModule, Routes} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {InputNumberModule} from 'primeng/inputnumber';
import {RatingModule} from 'primeng/rating';

import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'category/:categoryid',
    component: ProductsListComponent
  },
  {
    path: 'products/:productid',
    component: ProductsPageComponent
  }
];
@NgModule({
    imports: [CommonModule , 
      RouterModule.forChild(routes),ButtonModule,CheckboxModule,FormsModule,InputNumberModule,RatingModule,
    UiModule , OrdersModule],
    declarations: [
      FeaturedProductsComponent,
      ProductItemComponent,
      ProductSearchComponent,
      CatBanarComponent,
      ProductsPageComponent,
      ProductsListComponent
    ],
    exports:[
      FeaturedProductsComponent,
      ProductItemComponent,
      ProductSearchComponent,
      CatBanarComponent,
      ProductsPageComponent,
      ProductsListComponent]
})
export class ProductsModule {}
 