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

import { Common } from "./Common";
import { BrowserEventParser } from "./BrowserEventParser";
import { FormField, EventHandler, Event, getEventType } from "../interfaces/FormField";
import { Pattern } from "./Pattern";


export class InputField extends Common implements FormField
{
	private pattern:Pattern = null;
	private element:HTMLInputElement = null;


    constructor()
    {
        super();
        this.element = document.createElement("input");

        this.setBase(this);
        this.addEvents(this.element);
    }

    public getValue() : any
    {
        return(this.element.value);
    }

    public setValue(value: any) : void 
    {
        this.element.value = value;
    }
    
	public validate() : boolean 
	{
        throw new Error("Method not implemented.");
    }

	public getElement(): HTMLElement 
	{
		return(this.element);
	}

    public override setAttributes(attributes: Map<string, any>): void 
    {
        super.setAttributes(attributes);

        attributes.forEach((value,attr) => 
        {
            this.element.setAttribute(attr,value);
        });
    }

    private onEvent(jsevent:any) : void
    {
        let buble:boolean = false;
        let parser:BrowserEventParser = new BrowserEventParser(jsevent);

        if (parser.prevent) 
            jsevent.preventDefault();

        if (parser.ignore)
            return;

        if (parser.printable)
        {
            let pos:number = this.getPosition();
            this.setValue(this.getValue().toUpperCase());
            this.setPosition(pos);
        }

        if (buble)
        {
            let handler:EventHandler = this.getEventHandler();
            let event:Event = {type: getEventType(jsevent), event: jsevent};
            handler(event);
        }
    }

    private getPosition() : number
    {
        return(this.element.selectionStart);
    }

    private setPosition(pos:number) : void
    {
        this.element.setSelectionRange(pos,pos);
    }

    private addEvents(element:HTMLElement) : void
    {
        element.addEventListener("blur", (event) => {this.onEvent(event)});
        element.addEventListener("focus", (event) => {this.onEvent(event)});
        element.addEventListener("change", (event) => {this.onEvent(event)});

        element.addEventListener("keyup", (event) => {this.onEvent(event)});
        element.addEventListener("keydown", (event) => {this.onEvent(event)});
        element.addEventListener("keypress", (event) => {this.onEvent(event)});

        element.addEventListener("wheel", (event) => {this.onEvent(event)});
        element.addEventListener("mouseout", (event) => {this.onEvent(event)});
        element.addEventListener("mouseover", (event) => {this.onEvent(event)});

        element.addEventListener("click", (event) => {this.onEvent(event)});
        element.addEventListener("dblclick", (event) => {this.onEvent(event)});
    }
}