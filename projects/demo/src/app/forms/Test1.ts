import { Component } from '@angular/core';
import { Form, register } from 'forms42';

@Component({
	selector: 'test1',
	template: `
		<field class="alex" type="date" pattern="3344"></field><br>
		<input type="date"><br>
		<field id="radio" type="text" handler="input">
			<label class="alex" for="radio">Radio Button</label>
		</field>
		`,
	styleUrls:[`../../styles.sass`]
})

@register("/test1")

export class Test1 extends Form
{
	constructor()
	{
		super();
	}
}
