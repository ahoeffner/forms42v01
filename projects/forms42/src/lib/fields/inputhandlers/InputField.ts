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
import { Pattern } from "./Pattern";
import { DatePattern } from "./patterns/DatePattern";
import { BrowserEventParser } from "./BrowserEventParser";
import { FormField, EventHandler, Event, getEventType } from "../interfaces/FormField";


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

    public prepare() : void
    {

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
            if (attr == "type" && value == "date")
            {
                value = "text";
                this.pattern = new DatePattern();
                let plh:string = this.pattern.getPattern();
                this.element.setAttribute("placeholder",plh);
                this.element.size = plh.length;
                this.element.maxLength = plh.length;
            }

            this.element.setAttribute(attr,value);
        });
    }

    private onEvent(jsevent:any) : void
    {
        let buble:boolean = false;
        let parser:BrowserEventParser = new BrowserEventParser(jsevent);

        if (this.pattern != null)
        {
            this.applyPattern(parser);
            return;
        }

        if (parser.prevent) 
            jsevent.preventDefault();

        if (parser.ignore)
            return;

        if (parser.printable)
        {
            let pos:number = this.getPosition();
            //this.setValue(this.getValue().toUpperCase());
            //this.setPosition(pos);
        }

        if (buble)
        {
            let handler:EventHandler = this.getEventHandler();
            let event:Event = {type: getEventType(jsevent), event: jsevent};
            handler(event);
        }
    }

    private applyPattern(parser:BrowserEventParser) : void
    {
        let pos:number = this.getPosition();
        let pattern:string = this.pattern.getPattern();
        if (this.getValue().length == 0) this.setValue(pattern);

        if (parser.type == "click")
        {
            this.pattern.setPosition(pos);
        }

        if (parser.key == "Backspace")
        {
            parser.jsevent.preventDefault();
            let sel:number[] = this.getSelection();
            console.log("delete "+sel[0]+" - "+sel[1]);
        }

        if (parser.key == "ArrowLeft")
            console.log("left");

        if (parser.key == "ArrowRight")
            console.log("right");

        /*
        if (parser.printable)
        {
            let pos:number = this.getPosition();
            let val:string = this.pattern.setCharacter(pos,parser.key);

            this.setValue(val);
            this.setPosition(this.pattern.next());
        }
        */
    }

    private getPosition() : number
    {
        return(this.element.selectionStart);
    }

    private setPosition(pos:number) : void
    {
        this.element.setSelectionRange(pos,pos);
    }

    private getSelection() : number[]
    {
        let pos:number[] = [];
        pos[1] = this.element.selectionEnd;
        pos[0] = this.element.selectionStart;
        return(pos);
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