import { Component } from '@angular/core';
import { Form, injectable } from 'forms42';


@Component({
	selector: 'test1',
	template: 'Test1 <field type="text" style="background: red"><input class="cl1 cl2" type="date"></field>',
	styles: 
	[
	`
	`
	]
})

@injectable("/test1")


export class Test1 extends Form 
{
}
