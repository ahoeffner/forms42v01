import { Component } from '@angular/core';
import { Form, register } from 'forms42';

@Component({
	selector: 'test1',
	template: 'Test1 <field id="111" type="date" handler="input" pattern="Hello"></field>',
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
