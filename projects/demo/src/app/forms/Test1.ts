import { Component } from '@angular/core';
import { Form, register } from 'forms42';

@Component({
	selector: 'test1',
	template: `
		Test1 
		<field type="date" handler="input"></field>
		<field id="radio" type="text" handler="input">
			<label for="radio">Radio Button</label>
		</field>
		`,
	styles: 
	[
	`
	`
	]
})

@register("/test1")

export class Test1 extends Form 
{
}
