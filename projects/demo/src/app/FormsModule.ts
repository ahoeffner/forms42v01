import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Main } from './Main';
import { Menu } from './menu/Menu';
import { Test1 } from './forms/Test1';
import { FormsLibrary } from 'forms42';


@NgModule({
	declarations: [
		Main, Menu, Test1
	],
	imports: [
		BrowserModule, FormsLibrary
	],
	providers: [],
	bootstrap: [Main]
})


export class FormsModule {}
