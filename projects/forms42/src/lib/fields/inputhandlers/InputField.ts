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
import { FormField, EventHandler, Event } from "../interfaces/FormField";


export class InputField extends Common implements FormField
{
    private int:boolean = false;
    private dec:boolean = false;
	private pattern:Pattern = null;
    private placeholder:string = null;

	private element:HTMLInputElement = null;
    private event:BrowserEventParser = new BrowserEventParser();

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

    public setValue(value: any, parse?:boolean) : void
    {
        if (value == null) value = "";
        if (parse == null) parse = true;

        this.element.value = value;
        if (parse) this.validate();
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

        super.setAttributes(attributes);

        attributes.forEach((value,attr) =>
        {
            if (attr == "type") type = value;
            if (attr == "x-pattern") pattern = value;
            if (attr == "x-placeholder") this.placeholder = value;

            if (attr != "type" && attr.startsWith("x-"))
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
            this.pattern = new FieldPattern("{##} - {##} - {####}");
        }

        if (type == "x-fixed")
        {
            type = "text";

            if (pattern == null)
                console.error("x-pattern not specified for x-fixed field");

            this.pattern = new FieldPattern(pattern);
        }

        this.element.setAttribute("type",type);
    }

    private onEvent(event:any) : void
    {
        let buble:boolean = false;
        this.event.setEvent(event);
        let pos:number = this.getPosition();


        if (this.pattern != null)
        {
            if (!this.xfixed())
                return;
        }

        if (this.event.type == "blur")
        {
            if (this.placeholder != null)
                this.removeAttribute("placeholder");
        }

        if (this.event.type == "change")
        {
            this.validate();
            console.log("change "+this.getValue());
        }

        if (this.event.type == "focus")
        {
            if (this.placeholder != null)
                this.setAttribute("placeholder",this.placeholder);
        }

        if (this.event.mouseinit)
            setTimeout(() => {this.clearSelection(pos);},0);

        if (this.event.type == "mouseover" && this.placeholder != null)
            this.setAttribute("placeholder",this.placeholder);

        if (this.event.type == "mouseout" && this.placeholder != null && !this.event.focus)
            this.removeAttribute("placeholder");

        this.event.preventDefault();

        if (this.int)
        {
            if (!this.xint())
                return;
        }

        if (this.dec)
        {
            if (!this.xdec())
                return;
        }

        if (this.event.ignore)
            return;

        if (this.event.onScrollUp)
            console.log("scrollup : "+this.getValue());

        if (this.event.onScrollDown)
            console.log("scrolldown : "+this.getValue());

        if (this.event.onCtrlKeyUp)
            console.log("released : "+this.event.ctrlkey+" "+this.getValue());

        if (this.event.onCtrlKeyDown)
            console.log("pressed : "+this.event.ctrlkey+" "+this.getValue());

        if (this.event.onFuncKey)
            console.log("FuncKey : "+this.event.funckey+" "+this.getValue());

        if (buble)
        {
            //let handler:EventHandler = this.getEventHandler();
            //let event:Event = {type: this.event.event.type, event: event};
            //handler(event);
        }
    }

    private xint() : boolean
    {
        let pos:number = this.getPosition();

        if (this.event.type == "keydown")
        {
            if (this.event.isPrintableKey)
            {
                if (this.event.key < '0' || this.event.key > '9')
                {
                    this.event.preventDefault(true);
                }
                else if (this.event.repeat)
                {
                    let value:string = this.element.value;

                    let a:string = value.substring(pos);
                    let b:string = value.substring(0,pos);

                    this.element.value = b + this.event.key + a;
                    this.setPosition(++pos);
                }
            }

            return(false);
        }

        return(true);
    }

    private xdec() : boolean
    {
        let pos:number = this.getPosition();

        if (this.event.type == "keydown")
        {
            if (this.event.isPrintableKey)
            {
                let pass:boolean = false;

                if (this.event.key >= '0' && this.event.key <= '9')
                    pass = true;

                if (this.event.key == "." && !this.element.value.includes("."))
                    pass = true;

                if (!pass)
                {
                    this.event.preventDefault(true);
                }
                else if (this.event.repeat && this.event.key != ".")
                {
                    let value:string = this.element.value;

                    let a:string = value.substring(pos);
                    let b:string = value.substring(0,pos);

                    this.element.value = b + this.event.key + a;
                    this.setPosition(++pos);
                }
            }

            return(false);
        }

        return(true);
    }

    private xfixed() : boolean
    {
        let prevent:boolean = this.event.prevent;

        if (this.event.prevent)
            prevent = true;

        if (this.event.type == "drop")
            prevent = true;

        if (this.event.type == "keypress")
            prevent = true;

        if (this.event.key == "ArrowLeft" && this.event.shift)
            prevent = true;

        if (!this.event.modifier)
        {
            switch(this.event.key)
            {
                case "Backspace":
                case "ArrowLeft":
                case "ArrowRight": prevent = true;
            }
        }

        this.event.preventDefault(prevent);
        let pos:number = this.getPosition();

        if (this.event.type == "focus")
        {
            if (this.getValue() == null)
            {
                pos = this.pattern.findPosition(0);
                this.setValue(this.pattern.getValue(),false);
            }

            this.setPosition(pos);
            this.pattern.setPosition(pos);

            return(true);
        }

        if (this.event.type == "blur" || this.event.type == "change")
        {
            let valid:boolean = this.pattern.validate();

            if (this.pattern.isNull())
            {
                this.element.value = "";
                this.pattern.setPosition(0);
            }

            this.error(!valid);
            if (!valid) setTimeout(() => {this.element.focus();},1);

            return(true);
        }

        if (this.event.type == "mouseout" && this.pattern.isNull() && !this.event.focus)
            this.element.value = "";

        if (this.event.type == "mouseup")
        {
            // Wait until position is set

            let sel:number[] = this.getSelection();
            if (sel[1] < sel[0]) sel[1] = sel[0];

            if (!this.event.mousemark)
            {
                setTimeout(() =>
                {
                    pos = this.getPosition();

                    if (pos >= this.pattern.size())
                        pos = this.pattern.size() - 1;

                    pos = this.pattern.findPosition(pos);
                    let fld:number[] = this.pattern.getFieldArea(pos);

                    // toggle field selection
                    if (sel[1] - sel[0] <= 1) pos = fld[0];
                    else                      fld = [pos,pos];

                    this.setPosition(pos);
                    this.setSelection(fld);
                    this.pattern.setPosition(pos);
                },1);
            }
            else
            {
                setTimeout(() =>
                {
                    pos = this.getPosition();

                    if (pos >= this.pattern.size())
                        pos = this.pattern.size() - 1;

                    if (!this.pattern.setPosition(pos))
                    {
                        pos = this.pattern.findPosition(pos);
                        this.pattern.setPosition(pos);
                    }

                    if (sel[1] <= sel[0])
                    {
                        sel[1] = sel[0];
                        this.setPosition(sel[0]);
                        this.setSelection(sel);
                        this.pattern.setPosition(pos);
                    }
                },1);
            }

            return(false);
        }

        let ignore:boolean = this.event.ignore;
        if (this.event.printable) ignore = false;

        if (this.event.repeat)
        {
            switch(this.event.key)
            {
                case "Backspace":
                case "ArrowLeft":
                case "ArrowRight": ignore = false;
            }
        }

        if (ignore) return(true);

        if (this.event.key == "Backspace" && !this.event.modifier)
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
                this.setValue(this.pattern.delete(sel[0],sel[1]),false);

                if (sel[1] == sel[0] + 1)
                    pos = this.pattern.prev(true);

                if (!this.pattern.setPosition(pos))
                    pos = this.pattern.prev(true,pos);

                if (!this.pattern.setPosition(pos))
                    pos = this.pattern.next(true,pos);

                this.setPosition(pos);

                if (this.pattern.input(pos))
                    this.setSelection([pos,pos]);
            }

            return(false);
        }

        if (this.event.printable)
        {
            let sel:number[] = this.getSelection();

            if (sel[0] != sel[1])
            {
                pos = sel[0];
                this.pattern.delete(sel[0],sel[1]);
                this.element.value = this.pattern.getValue();
                pos = this.pattern.findPosition(sel[0]);
                this.setPosition(pos);
                this.setSelection([pos,pos]);
            }

            if (this.pattern.setCharacter(pos,this.event.key))
            {
                this.setValue(this.pattern.getValue(),false);
                this.setPosition(this.pattern.next(true));
                pos = this.pattern.getPosition();
                this.setSelection([pos,pos]);
            }

            return(false);
        }

        if (this.event.key == "ArrowLeft")
        {
            let sel:number[] = this.getSelection();

            if (!this.event.modifier)
            {
                pos = this.pattern.prev(true);
                this.setPosition(pos);
                this.setSelection([pos,pos]);
            }
            else if (this.event.shift)
            {
                if (pos > 0)
                {
                    pos--;
                    this.setPosition(pos);
                    this.setSelection([pos,sel[1]-1]);
                }
            }
            return(false);
        }

        if (this.event.key == "ArrowRight" && !this.event.modifier)
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
        let pos:number = this.element.selectionStart;
        if (pos < 0) pos = 0;
        return(pos);
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

    private clearSelection(pos:number) : void
    {
        this.element.selectionEnd = pos;
        this.element.selectionStart = pos;
    }

    private getSelection() : number[]
    {
        let pos:number[] = [];
        pos[1] = this.element.selectionEnd;
        pos[0] = this.element.selectionStart;
        return(pos);
    }

    public addEvents(element:HTMLElement) : void
    {
        element.addEventListener("blur", (event) => {this.onEvent(event)});
        element.addEventListener("focus", (event) => {this.onEvent(event)});
        element.addEventListener("change", (event) => {this.onEvent(event)});

        element.addEventListener("keyup", (event) => {this.onEvent(event)});
        element.addEventListener("keydown", (event) => {this.onEvent(event)});
        element.addEventListener("keypress", (event) => {this.onEvent(event)});

        element.addEventListener("wheel", (event) => {this.onEvent(event)});
        element.addEventListener("mouseup", (event) => {this.onEvent(event)});
        element.addEventListener("mouseout", (event) => {this.onEvent(event)});
        element.addEventListener("mousedown", (event) => {this.onEvent(event)});
        element.addEventListener("mouseover", (event) => {this.onEvent(event)});
        element.addEventListener("mousemove", (event) => {this.onEvent(event)});

        element.addEventListener("drop", (event) => {this.onEvent(event)});
        element.addEventListener("dragover", (event) => {this.onEvent(event)});

        element.addEventListener("click", (event) => {this.onEvent(event)});
        element.addEventListener("dblclick", (event) => {this.onEvent(event)});
    }
}