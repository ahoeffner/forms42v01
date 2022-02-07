import { Form } from '../forms/Form';
import { Field } from '../fields/Field';
import { Context } from '../application/Context';
import { NGComponentFactory } from './NGComponentFactory';
import { Field as IField } from '../framework/interfaces/Field';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';



@Component({
	selector: 'field',
	template: 
	`
        <span #container></span>
    `
	})


export class NGField implements IField, OnInit 
{
    private form:Form = null;
	private container:HTMLDivElement = null;
	@ViewChild("container",{read: ElementRef, static: true}) private celem:ElementRef;


    constructor()
    {
        let field:Field = new Field(this);
    }


    public ngOnInit(): void 
    {
		this.container = this.celem.nativeElement;
        this.container.innerHTML = "<input>";
        this.form = (Context.factory.factory() as NGComponentFactory).form;
        console.log("Current Form "+this.form);
    }
}