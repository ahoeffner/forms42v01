import { NGForm } from './NGForm';
import { NGComponentFactory } from './NGComponentFactory';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';



@Component({
	selector: 'field',
	template: 
	`
        <span #container></span>
    `
	})


export class NGField implements OnInit 
{
    private form:NGForm = null;
	private container:HTMLDivElement = null;
	@ViewChild("container",{read: ElementRef, static: true}) private celem:ElementRef;


    public ngOnInit(): void 
    {
        //this.form = NGComponentFactory.form;
		this.container = this.celem.nativeElement;
        this.container.innerHTML = "<input>";
        console.log("Current Form "+this.form);
    }
}