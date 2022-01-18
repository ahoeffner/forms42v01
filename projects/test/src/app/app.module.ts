import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Forms42 } from 'forms42'; 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, Forms42
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
