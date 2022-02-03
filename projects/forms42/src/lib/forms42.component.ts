import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'f42-main',
	template: `
    <p>
      forms42 working 3.17
    </p>
  `,
	styles: [
	]
})
export class Forms42Component implements OnInit {

	constructor() { }

	ngOnInit(): void {
		console.log("Init II");
	}
}
