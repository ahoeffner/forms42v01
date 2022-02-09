import { Context } from '../application/Context';
import { FormPrivate } from '../forms/FormPrivate';
import { FieldInstance } from '../fields/FieldInstance';
import { NGComponentFactory } from './NGComponentFactory';
import { FieldInstance as IField } from '../framework/interfaces/FieldInstance';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';



@Component({
	selector: 'field',
	template: 
	`
        <span #container></span>
        <span #implementation style="display: none"><ng-content></ng-content></span>
    `
	})


export class NGField extends FieldInstance implements IField, OnInit
{
    private form:FormPrivate = null;
	private implementation$:HTMLElement = null;
	private placeholder$:HTMLSpanElement = null;

    @Input("id")    public id:string    = null;
    @Input("row")   public row:string   = null;
    @Input("type")  public type:string  = null;
    @Input("name")  public name:string  = null;
    @Input("size")  public size:string  = null;
    @Input("value") public value:string = null;
    @Input("block") public block:string = null;
    @Input("group") public group:string = null;
    @Input("class") public class:string = null;
    @Input("style") public style:string = null;

    @ViewChild("container",{read: ElementRef, static: true}) private celem:ElementRef;
    @ViewChild("implementation",{read: ElementRef, static: true}) private ielem:ElementRef;


    public ngOnInit(): void 
    {
		this.placeholder$ = this.celem.nativeElement;
		this.implementation$ = this.ielem.nativeElement;
        this.form = (Context.factory.factory() as NGComponentFactory).form;
        console.log("implementation : "+(this.ielem.nativeElement as HTMLElement).innerHTML);

        this["__priv__"].setImplementation(this);
        this.form.addFieldInstance(this);
    }


    public placeholder(): HTMLSpanElement 
    {
        return(this.placeholder$);
    }


    public implementation(): HTMLSpanElement 
    {
        return(this.implementation$);
    }
}