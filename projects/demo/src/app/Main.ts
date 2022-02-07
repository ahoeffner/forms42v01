import { Forms42 } from 'forms42';
import { Component } from '@angular/core';

@Component({
	selector: 'forms42',
	templateUrl: './Main.html',
	styleUrls: ['./Main.sass']
})


export class Main 
{
	constructor(private forms: Forms42) { }
}
