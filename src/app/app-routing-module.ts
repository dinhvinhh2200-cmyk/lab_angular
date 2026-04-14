import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponents } from './home-components/home-components';
import { ProductComponents } from './product-components/product-components';
import { ProductDetail } from './product-detail/product-detail';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';
import { UserForm } from './user-form/user-form';
import { PostList } from './post-list/post-list';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponents},
  {path: 'products', component: ProductComponents},
  {path: 'newuser', component: UserForm},
  {path: 'aboutus', component: PostList},
  {path: 'products/:id', component:ProductDetail},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
