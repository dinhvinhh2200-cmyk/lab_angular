import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Card } from './card/card';
import { ColorDot } from './color-dot/color-dot';
import { CardSize } from './card-size/card-size';

@NgModule({
  declarations: [App, Card, ColorDot, CardSize],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
