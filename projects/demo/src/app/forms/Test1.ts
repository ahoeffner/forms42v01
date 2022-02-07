import { Component } from '@angular/core';
import { Form, injectable } from 'forms42';


@Component({
	selector: 'test1',
	template: 'Test1 <field></field>'
})

@injectable("/test1")


export class Test1 extends Form 
{
}
