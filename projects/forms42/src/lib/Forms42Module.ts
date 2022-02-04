import { NgModule } from '@angular/core';
import { Forms42Main } from './angular/Forms42Main';


@NgModule({
	imports: [],
	declarations: [Forms42Main],
	exports: [Forms42Main]
})


export class Forms42Module 
{
	constructor()
	{
		console.log("Forms42 Version 2.0");
	}
}