import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
  {
    path:'products',
    component:ProductsComponent
  },
  {
    path:'product-detail/:id',
    component:ProductDetailComponent
  }
];
