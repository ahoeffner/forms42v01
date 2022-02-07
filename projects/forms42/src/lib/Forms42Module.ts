import { NgModule } from '@angular/core';
import { NGMain } from './angular/NGMain';
import { CommonModule } from '@angular/common';


@NgModule({
	imports: [CommonModule],
	declarations: [NGMain],
	exports: [NGMain]
})


export class Forms42Module
{
	constructor()
	{
		console.log("Forms42 Version 2.0");
	}
}