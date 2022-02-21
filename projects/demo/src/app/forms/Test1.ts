import { Component } from '@angular/core';
import { Form, register } from 'forms42';

@Component({
	selector: 'test1',
	template: `
		<field class="alex" type="date"></field>
		<br>
		<field type="text" upper handler="input" format="{2A} - {4#}"></field>
		<br>
		<field type="text"></field>
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
