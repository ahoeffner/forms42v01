/*
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 3 only, as
 * published by the Free Software Foundation.

 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 */

import { Context } from '../application/Context';
import { FormPrivate } from '../forms/FormPrivate';
import { FieldInstance } from '../fields/FieldInstance';
import { NGComponentFactory } from './NGComponentFactory';
import { FieldInstance as IField } from '../framework/interfaces/FieldInstance';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component
({
	selector: 'field',
	template: 
	`
        <span #tag></span>
        <span #body style="display: none"><ng-content></ng-content></span>
    `
})

export class NGField extends FieldInstance implements IField, OnInit
{
	private body$:HTMLElement = null;
	private ctag$:HTMLSpanElement = null;
    private attributes$:Map<string,string> = new Map<string,string>();

    @ViewChild("tag",{read: ElementRef, static: true}) private telem:ElementRef;
    @ViewChild("body",{read: ElementRef, static: true}) private belem:ElementRef;

    constructor(elem:ElementRef)
    {
        super();

        let tag:HTMLElement = elem.nativeElement;
        tag.getAttributeNames().forEach((attr:string) =>
        {
            if (!attr.startsWith("_"))
            {
                let value:string = tag.getAttribute(attr);
                this.attributes$.set(attr,value);
            }
        });
    }

    public ngOnInit(): void 
    {
		this.ctag$ = this.telem.nativeElement;
		this.body$ = this.belem.nativeElement.childNodes[0];

        this.belem.nativeElement.remove();
        let form:FormPrivate = (Context.factory.factory() as NGComponentFactory).form;

        this["__priv__"].setImplementation(this);
        form.addFieldInstance(this);
    }

    public tag(): HTMLSpanElement 
    {
        return(this.ctag$);
    }

    public body(): HTMLSpanElement 
    {
        return(this.body$);
    }

    public attributes(): Map<string, string> 
    {
        return(this.attributes$);    
    }
}