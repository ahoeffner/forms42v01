import { NGMain } from './angular/NGMain';
import { Builder } from './angular/Builder';
import { Context } from './application/Context';
import { ComponentFactory } from './application/ComponentFactory';
import { NgModule } from '@angular/core';
import { NGField } from './angular/NGField';


@NgModule({
	imports: [],
	declarations: [NGMain, NGField],
	exports: [NGMain, NGField]
})


export class FormsLibrary
{
	constructor()
	{
		console.log("Forms42 Version 2.0");
	}
}