import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Forms42Module } from 'forms42'; 
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, Forms42Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
