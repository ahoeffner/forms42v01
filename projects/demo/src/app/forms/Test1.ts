import { Component } from '@angular/core';
import { Form, register } from 'forms42';

@Component({
	selector: 'test1',
	template: `
		Test1 
		<field type="date" handler="input" pattern="Hello"></field>
		<field id="radio" type="radio" handler="input" pattern="Hello">
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
