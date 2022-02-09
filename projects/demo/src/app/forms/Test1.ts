import { Component } from '@angular/core';
import { Form, injectable } from 'forms42';


@Component({
	selector: 'test1',
	template: 'Test1 <field><input class="cl1 cl2" type="date"></field>'
})

@injectable("/test1")


export class Test1 extends Form 
{
}
