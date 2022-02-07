import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Main } from './Main';
import { Forms42Module } from 'forms42';
import { Test1 } from './forms/Test1';

@NgModule({
	declarations: [
		Main, Test1
	],
	imports: [
		BrowserModule, Forms42Module
	],
	providers: [],
	bootstrap: [Main]
})


export class FormsModule 
{
	constructor()
	{
	}
}
