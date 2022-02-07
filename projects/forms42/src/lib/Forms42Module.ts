import { NgModule } from '@angular/core';
import { NGMain } from './angular/NGMain';


@NgModule({
	imports: [],
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