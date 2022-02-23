import { Component } from '@angular/core';
import { Form, register } from 'forms42';

@Component({
	selector: 'test1',
	template: `
		<div style="position: relative;">
			<div>
				<field type="x-date"></field>
			</div>

			<div style="margin-top: 25px; position: relative">
				<field type="x-fixed" format="{2A} - {4#}"></field>
			</div>

			<div style="margin-top: 25px; position: relative">
				<field id="xx" type="x-int">
					<label for="xx">Do you like cheese?</label>
					<script>console.log("hello")</script>
				</field>
			</div>

			<div style="margin-top: 25px; position: relative">
				<field type="x-dec"></field>
			</div>

			<div class="movable" draggable="true" style="margin-top: 25px; border: 1px solid black;">
				<p>Movable</p>
				<field type="text"></field>
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
