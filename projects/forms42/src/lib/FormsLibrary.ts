import { NGMain } from './angular/NGMain';
import { Builder } from './angular/Builder';
import { Context } from './application/Context';
import { ComponentFactory } from './application/ComponentFactory';
import { NgModule } from '@angular/core';


@NgModule({
	imports: [],
	declarations: [NGMain],
	exports: [NGMain]
})


export class FormsLibrary
{
	constructor()
	{
		console.log("Forms42 Version 2.0");
	}
}