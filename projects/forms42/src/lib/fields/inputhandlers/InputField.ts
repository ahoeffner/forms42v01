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
import { FieldPattern } from "./patterns/FieldPattern";
import { BrowserEventParser } from "./BrowserEventParser";
import { FormField, EventHandler, Event, getEventType } from "../interfaces/FormField";


export class InputField extends Common implements FormField
{
	private pattern:Pattern = null;
	private element:HTMLInputElement = null;
    private parser:BrowserEventParser = new BrowserEventParser();



    constructor()
    {
        super();
        this.element = document.createElement("input");

        this.setBase(this);
        this.addEvents(this.element);
    }

    public getValue() : any
    {
        let str:string = this.element.value.trim();
        if (str.length == 0) return(null);
        return(str);
    }

    public setValue(value: any) : void
    {
        if (value == null) value = "";
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
                this.pattern = new FieldPattern("{##}-{##}-{####}");
                let plh:string = this.pattern.placeholder();
                if (plh != null) this.element.setAttribute("placeholder",plh);
            }

            this.element.setAttribute(attr,value);
        });
    }

    private onEvent(jsevent:any) : void
    {
        let buble:boolean = false;
        this.parser.event = jsevent;

        if (this.pattern != null)
        {
            this.applyPattern();
            return;
        }

        if (this.parser.prevent)
            jsevent.preventDefault();

        if (this.parser.ignore)
            return;

        if (this.parser.CtrlKeyUp)
            console.log("released meta: "+this.parser.meta+" ctrl: "+this.parser.ctrl+" "+this.getValue());

        if (this.parser.CtrlKeyDown)
            console.log("pressed meta: "+this.parser.meta+" ctrl: "+this.parser.ctrl+" "+this.getValue());

        if (buble)
        {
            let handler:EventHandler = this.getEventHandler();
            let event:Event = {type: getEventType(jsevent), event: jsevent};
            handler(event);
        }
    }

    private applyPattern() : void
    {
        let pos:number = this.getPosition();
        let plh:string = this.pattern.placeholder();
        if (this.getValue() == null) this.setValue(plh);

        let prevent:boolean = this.parser.prevent;

        if (this.parser.printable)
            prevent = true;

        if (!this.parser.modifier)
        {
            switch(this.parser.key)
            {
                case "Backspace":
                case "ArrowLeft":
                case "ArrowRight": prevent = true;
            }
        }

        this.parser.preventDefault(prevent);

        if (this.parser.ignore)
            return;

        if (this.parser.type == "click")
            this.pattern.setPosition(this.getPosition());

        if (this.parser.key == "Backspace" && !this.parser.modifier)
        {
            let sel:number[] = this.getSelection();

            pos = sel[0];

            if (sel[0] > 0 && sel[0] == sel[1])
            {
                pos--;

                // Move past fixed pattern before deleting
                if (!this.pattern.setPosition(pos) && sel[0] > 0)
                {
                    let pre:number = pos;

                    pos = this.pattern.prev();
                    let off:number = pre - pos;

                    if (off > 0)
                    {
                        sel[0] = sel[0] - off;
                        sel[1] = sel[1] - off;
                    }
                }
            }

            if (this.pattern.delete(sel[0],sel[1]))
                this.setValue(this.pattern.getValue());

            this.setPosition(pos);
        }

        if (this.parser.key == "ArrowLeft" && !this.parser.modifier)
            this.setPosition(this.pattern.prev());

        if (this.parser.key == "ArrowRight" && !this.parser.modifier)
            this.setPosition(this.pattern.next());

        if (this.parser.printable)
        {
            let sel:number[] = this.getSelection();

            if (sel[0] != sel[1])
            {
                pos = sel[0];
                this.pattern.delete(sel[0],sel[1]);

                if (!this.pattern.setPosition(sel[0]))
                    this.pattern.next();
            }

            if (this.pattern.setCharacter(pos,this.parser.key))
            {
                this.setValue(this.pattern.getValue());
                this.setPosition(this.pattern.next());
            }
        }
    }

    private getPosition() : number
    {
        return(this.element.selectionStart);
    }

    private setPosition(pos:number) : void
    {
        if (pos < 0) pos = 0;
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