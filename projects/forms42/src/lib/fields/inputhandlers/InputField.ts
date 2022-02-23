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
import { Pattern } from "./patterns/interfaces/Pattern";
import { BrowserEventParser } from "./BrowserEventParser";
import { Pattern as FieldPattern } from "./patterns/Pattern";
import { FormField, EventHandler, Event, getEventType } from "../interfaces/FormField";


export class InputField extends Common implements FormField
{
    private int:boolean = false;
    private dec:boolean = false;
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
        let type:string = "text";
        let pattern:string = null;
        let placeholder:string = null;

        super.setAttributes(attributes);

        attributes.forEach((value,attr) =>
        {
            if (attr == "type") type = value;
            if (attr == "format") pattern = value;
            if (attr == "placeholder") placeholder = value;

            if (attr != "type" && attr != "format")
                this.element.setAttribute(attr,value);
        });

        if (type == "x-int")
        {
            type = "text";
            this.int = true;
        }

        if (type == "x-dec")
        {
            type = "text";
            this.dec = true;
        }

        if (type == "x-date")
        {
            type = "text";
            this.element.removeAttribute("placeholder");
            this.pattern = new FieldPattern("{##} - {##} - {####}","dd - mm - yyyy");
        }

        if (type == "x-fixed")
        {
            type = "text";
            this.element.removeAttribute("placeholder");
            this.pattern = new FieldPattern(pattern,placeholder);
        }

        this.element.setAttribute("type",type);
    }

    private onEvent(jsevent:any) : void
    {
        let buble:boolean = false;
        this.parser.event = jsevent;

        if (this.pattern != null)
        {
            if (!this.applyPattern())
                return;
        }

        if (this.parser.type == "blur")
        {

        }

        if (this.parser.type == "change")
        {

        }

        if (this.parser.prevent)
            jsevent.preventDefault();

        if (this.int && this.parser.type == "keydown")
        {
            if (this.parser.isPrintableKey)
            {
                if (this.parser.key < '0' || this.parser.key > '9')
                {
                    jsevent.preventDefault();
                    return;
                }
            }
        }

        if (this.dec && this.parser.type == "keydown")
        {
            if (this.parser.isPrintableKey)
            {
                let pass:boolean = false;

                if (this.parser.key >= '0' && this.parser.key <= '9')
                    pass = true;

                if (this.parser.key == "." && !this.element.value.includes("."))
                    pass = true;

                if (!pass)
                {
                    jsevent.preventDefault();
                    return;
                }
            }
        }

        if (this.parser.ignore)
            return;

        if (this.parser.CtrlKeyUp)
            console.log("released : "+this.parser.ctrlkey+" "+this.getValue());

        if (this.parser.CtrlKeyDown)
            console.log("pressed : "+this.parser.ctrlkey+" "+this.getValue());

        if (this.parser.FuncKey)
            console.log("FuncKey : "+this.parser.funckey+" "+this.getValue());

        if (buble)
        {
            let handler:EventHandler = this.getEventHandler();
            let event:Event = {type: getEventType(jsevent), event: jsevent};
            handler(event);
        }
    }


    private fieldsel:number[] = [0,0];

    private applyPattern() : boolean
    {
        let prevent:boolean = this.parser.prevent;

        if (this.parser.printable)
            prevent = true;

        if (this.parser.type == "drop")
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
        let pos:number = this.getPosition();

        if (this.getValue() == null)
            this.setValue(this.pattern.getValue());

        if (this.parser.type == "blur" || this.parser.type == "change")
        {
            this.pattern.setPosition(0);

            if (this.pattern.isNull())
                this.setValue(null);

            let valid:boolean = this.pattern.validate();

            this.error(!valid);
            if (!valid) setTimeout(() => {this.element.focus();},1);

            return(true);
        }

        if (this.parser.type == "click")
        {
            if (pos >= this.pattern.size())
                pos = this.pattern.size() - 1;

            let fld:number[] = this.pattern.getFieldArea(pos);

            if (pos < fld[0] || pos > fld[1])
            {
                pos = fld[0];
                this.fieldsel = [pos,pos];
            }

            // toggle field selection
            if (this.fieldsel[0] == this.fieldsel[1]) pos = fld[0];
            else                                      fld = [pos,pos];

            this.fieldsel = fld;
            this.setPosition(pos);
            this.setSelection(fld);
            this.pattern.setPosition(pos);

            return(false);
        }

        if (this.parser.ignore || !this.parser.isKeyEvent)
            return(true);

        this.fieldsel = [0,0];

        if (this.parser.key == "Backspace" && !this.parser.modifier)
        {
            let sel:number[] = this.getSelection();

            if (sel[0] == sel[1] && !this.pattern.input(sel[0]))
            {
                pos = this.pattern.prev(true);
                this.setPosition(pos);
                this.setSelection([pos,pos]);
            }
            else
            {
                pos = sel[0];

                if (sel[0] > 0 && sel[0] == sel[1])
                {
                    pos--;

                    // Move past fixed pattern before deleting
                    if (!this.pattern.setPosition(pos) && sel[0] > 0)
                    {
                        let pre:number = pos;

                        pos = this.pattern.prev(true);
                        let off:number = pre - pos;

                        if (off > 0)
                        {
                            sel[0] = sel[0] - off;
                            sel[1] = sel[1] - off;
                        }
                    }
                }

                pos = sel[0];
                this.setValue(this.pattern.delete(sel[0],sel[1]));

                if (sel[1] == sel[0] + 1)
                    pos = this.pattern.prev(true);

                if (!this.pattern.setPosition(pos))
                    pos = this.pattern.prev(true,pos);

                this.setPosition(pos);

                if (this.pattern.input(pos))
                    this.setSelection([pos,pos]);
            }

            return(false);
        }

        if (this.parser.printable)
        {
            let sel:number[] = this.getSelection();

            if (sel[0] != sel[1])
            {
                pos = sel[0];
                this.pattern.delete(sel[0],sel[1]);

                if (!this.pattern.setPosition(sel[0]))
                    this.pattern.next(true);
            }

            if (this.pattern.setCharacter(pos,this.parser.key))
            {
                this.setValue(this.pattern.getValue());
                this.setPosition(this.pattern.next(true));
                pos = this.pattern.getPosition();
                this.setSelection([pos,pos]);
            }

            return(false);
        }

        if (this.parser.key == "ArrowLeft" && !this.parser.modifier)
        {
            pos = this.pattern.prev(true);
            this.setPosition(pos);
            this.setSelection([pos,pos]);
            return(false);
        }

        if (this.parser.key == "ArrowRight" && !this.parser.modifier)
        {
            pos = this.pattern.next(true);
            this.setPosition(pos);
            this.setSelection([pos,pos]);
            return(false);
        }

        return(true);
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

    private setSelection(sel:number[]) : void
    {
        this.element.selectionStart = sel[0];
        this.element.selectionEnd = sel[1]+1;
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

        element.addEventListener("drop", (event) => {this.onEvent(event)});
        element.addEventListener("dragover", (event) => {this.onEvent(event)});

        element.addEventListener("click", (event) => {this.onEvent(event)});
        element.addEventListener("dblclick", (event) => {this.onEvent(event)});
    }
}