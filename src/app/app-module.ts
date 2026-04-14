import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Card } from './card/card';
import { ColorDot } from './color-dot/color-dot';
import { CardSize } from './card-size/card-size';
import { Nav } from './nav/nav';
import { HomeComponents } from './home-components/home-components';
import { ProductComponents } from './product-components/product-components';
import { ProductDetail } from './product-detail/product-detail';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';
import { UserForm } from './user-form/user-form';
import { PostItem } from './post-item/post-item';
import { PostList } from './post-list/post-list';
import { Cart } from './cart/cart';
import { ShippingStatus } from './cart/shipping-status/shipping-status';
import { OrderList } from './cart/order-list/order-list';
import { SelectVoucher } from './cart/select-voucher/select-voucher';
import { OrderSummary } from './cart/order-summary/order-summary';

@NgModule({
  declarations: [
    App,
    Card,
    ColorDot,
    CardSize,
    Nav,
    HomeComponents,
    ProductComponents,
    ProductDetail,
    PageNotFoundComponent,
    UserForm,
    PostItem,
    PostList,
    Cart,
    ShippingStatus,
    OrderList,
    SelectVoucher,
    OrderSummary,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
