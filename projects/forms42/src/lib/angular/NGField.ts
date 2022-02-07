import { Field } from '../fields/Field';
import { Context } from '../application/Context';
import { FormPrivate } from '../forms/FormPrivate';
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


export class NGField extends Field implements IField, OnInit 
{
    private form:FormPrivate = null;
	private container:HTMLDivElement = null;

    @ViewChild("container",{read: ElementRef, static: true}) private celem:ElementRef;


    public ngOnInit(): void 
    {
		this.container = this.celem.nativeElement;
        this.container.innerHTML = "<input>";
        this.form = (Context.factory.factory() as NGComponentFactory).form;

        this["__fw__"] = this;
        this.form.addField(this);
    }
}