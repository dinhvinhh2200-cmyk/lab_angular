import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponents } from './home-components/home-components';
import { ProductComponents } from './product-components/product-components';
import { ProductDetail } from './product-detail/product-detail';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponents},
  {path: 'products', component: ProductComponents},
  {path: 'products/:id', component:ProductDetail}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
