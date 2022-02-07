import { NgModule } from '@angular/core';
import { NGMain } from './angular/NGMain';


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