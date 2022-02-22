import { Component } from '@angular/core';
import { Form, register } from 'forms42';

@Component({
	selector: 'test1',
	template: `
		<div style="position: relative;">
			<div>
				<field class="alex" type="date"></field>
			</div>
			<div style="margin-top: 25px; position: relative">
				<field type="text" upper handler="input" format="{2A} - {4#}"></field>
			</div>
			<div class="movable" draggable="true" style="margin-top: 25px; border: 1px solid black;">
				<p>Movable</p>
				<field type="text"></field>
			</div>
		</div>

		<script>
			var mv = document.getElementsByClassName("movable");
			console.log("movable: "+movable);
		</script>
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
