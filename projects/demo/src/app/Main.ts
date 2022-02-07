import { Forms42 } from 'forms42';
import { AfterViewInit, Component } from '@angular/core';

@Component({
	selector: 'forms42',
	templateUrl: './Main.html',
	styleUrls: ['./Main.sass']
})


export class Main implements AfterViewInit
{
	constructor(private forms: Forms42) { }


	ngAfterViewInit(): void 
	{
		this.forms.showform("/test1");
	}
}
