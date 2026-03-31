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
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
