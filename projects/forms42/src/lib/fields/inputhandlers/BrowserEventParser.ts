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

export class BrowserEventParser
{
    private event$:any;

    public key:string = null;
    public ctrlkey:string = null;
    public funckey:string = null;
    public ignore:boolean = false;
    public prevent:boolean = false;
    public printable:boolean = false;

    public alt:boolean = false;
    public ctrl:boolean = false;
    public meta:boolean = false;
    public shift:boolean = false;

    public set event(event:any)
    {
        this.event$ = event;

        if (!this.isKeyEvent) this.reset();
        else                  this.parseKeyEvent();
    }


    public get event() : any
    {
        return(this.event$);
    }


    public reset() : void
    {
        this.key = null;
        this.alt = false;
        this.meta = false;
        this.ctrl = false;
        this.shift = false;
        this.ignore = false;
        this.prevent = false;
        this.printable = false;

        this.ctrlkey = null;
        this.funckey = null;
    }

    public get isKeyEvent() : boolean
    {
        return(this.event.type.startsWith("key"));
    }

    public get isPrintableKey() : boolean
    {
        if (this.ctrlkey != null) return(false);
        return(this.key != null && this.key.length == 1);
    }

    public get onFuncKey() : boolean
    {
        return(this.funckey != null);
    }

    public get onCtrlKeyUp() : boolean
    {
        return(this.ctrlkey != null && this.type == "keyup");
    }

    public get onCtrlKeyDown() : boolean
    {
        return(this.ctrlkey != null && this.type == "keydown");
    }

    public get type() : string
    {
        return(this.event.type);
    }

    public get modifier() : boolean
    {
        return(this.alt || this.ctrl || this.meta || this.shift);
    }

    public preventDefault(flag?:boolean) : void
    {
        if (flag == null) flag = this.prevent;
        if (flag) this.event.preventDefault();
    }


    private parseKeyEvent() : void
    {
        this.printable = false;

        switch(this.event.type)
        {
            case "keyup" :

                if (!this.alt && !this.ctrl && !this.meta)
                {
                    if (this.event.key.length == 1)
                    {
                        this.ignore = false;
                        this.printable = true;
                        this.key = this.event.key;
                    }
                }

                if (this.key.startsWith("F")) this.ignore = false;

                if (this.event.key == "Backspace") this.ignore = false;
                if (this.event.key == "ArrowLeft") this.ignore = false;
                if (this.event.key == "ArrowRight") this.ignore = false;

                if (this.event.key == "Alt") {this.ignore = true; this.alt = false;}
                if (this.event.key == "Meta") {this.ignore = true; this.meta = false;}
                if (this.event.key == "Shift") {this.ignore = true; this.shift = false;}
                if (this.event.key == "Control") {this.ignore = true; this.ctrl = false;}

                if (this.ctrlkey != null) this.ignore = false;

            break;

            case "keypress":

                this.ignore = true;
                this.key = this.event.key;

                if (this.event.key.length == 1)
                    this.printable = true;

            break;

            case "keydown":

                this.ignore = true;
                this.prevent = false;
                this.printable = false;

                this.ctrlkey = null;
                this.funckey = null;

                this.key = this.event.key;

                if (this.key.length == 1 && (this.alt || this.ctrl || this.meta))
                {
                    this.ignore = false;
                    if (this.alt) this.ctrlkey = "ALT-"+this.key;
                    if (this.ctrl) this.ctrlkey = "CTRL-"+this.key;
                    if (this.meta) this.ctrlkey = "META-"+this.key;

                    switch(this.key)
                    {
                        case '+':
                        case '-':
                        case 'a':
                        case 'c':
                        case 'x':
                        case 'v':
                        case 'r':
                        case 'z': break;
                        default : this.prevent = true;
                    }
                }

                if (this.key == "Alt") this.alt = true;
                if (this.key == "Meta") this.meta = true;
                if (this.key == "Shift") this.shift = true;
                if (this.key == "Control") this.ctrl = true;

                if (this.key == "Tab") this.prevent = true;
                if (this.key == "ArrowUp") this.prevent = true;
                if (this.key == "ArrowDown") this.prevent = true;

                if (this.key.startsWith("F"))
                {
                    this.prevent = true;
                    this.funckey = this.key;
                }

            break;

            default:
                this.key = null;
                this.ignore = true;
                this.prevent = false;
                this.printable = false;
            break;
        }
    }


    public toString() : string
    {
        return(this.type+" prevent: "+this.prevent+" ignore: "+this.ignore+" printable: "+this.printable+" key: "+this.key);
    }
}