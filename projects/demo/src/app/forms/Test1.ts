import { Form, register } from 'forms42';
import { Component } from '@angular/core';

@Component({
	selector: 'test1',
	template: `
		<div style="position: relative;">
			<div>
				<field type="x-date" x-placeholder="dd  -  mm  -  yyyy"></field>
			</div>

			<div style="margin-top: 25px; position: relative">
				<field type="x-fixed" x-pattern="+ {2A} - {4#} $" x-placeholder="+  BA - 0000  $"></field>
			</div>

			<div style="margin-top: 25px; position: relative">
				<field type="x-int"></field>
			</div>

			<div style="margin-top: 25px; position: relative">
				<field type="x-dec"></field>
			</div>

			<div class="movable" draggable="true" style="margin-top: 25px; border: 1px solid black;">
				<p>Movable</p>
				<input type="text">
			</div>

			<div style="margin-top: 20px;">
				<menu provider="Denmark" classes="left-menu">
					<button>Left</button>
				</menu>
			</div>

			<div style="margin-top: 20px;">
				<menu provider="Denmark" classes="dropdown">
					DropDown
				</menu>
			</div>
		</div>
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
