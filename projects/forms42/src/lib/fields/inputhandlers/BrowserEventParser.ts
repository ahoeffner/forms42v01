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
    private jsevent$:any;

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
        this.jsevent$ = event;

        if (!this.isKey) this.reset();
        else             this.parseKeyEvent();
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

    public get isKey() : boolean
    {
        return(this.jsevent$.type.startsWith("key"));
    }

    public get FuncKey() : boolean
    {
        return(this.funckey != null);
    }

    public get CtrlKeyUp() : boolean
    {
        return(this.ctrlkey != null && this.type == "keyup");
    }

    public get CtrlKeyDown() : boolean
    {
        return(this.ctrlkey != null && this.type == "keydown");
    }

    public get type() : string
    {
        return(this.jsevent.type);
    }


    public get jsevent() : any
    {
        return(this.jsevent$);
    }


    public get modifier() : boolean
    {
        return(this.alt || this.ctrl || this.meta || this.shift);
    }


    public preventDefault(flag?:boolean) : void
    {
        if (flag == null) flag = this.prevent;
        if (flag) this.jsevent.preventDefault();
    }


    private parseKeyEvent() : void
    {
        this.printable = false;

        switch(this.jsevent.type)
        {
            case "keyup" :

                if (!this.alt && !this.ctrl && !this.meta)
                {
                    if (this.jsevent.key.length == 1)
                    {
                        this.ignore = false;
                        this.printable = true;
                        this.key = this.jsevent.key;
                    }
                }

                if (this.key.startsWith("F")) this.ignore = false;

                if (this.jsevent.key == "Backspace") this.ignore = false;
                if (this.jsevent.key == "ArrowLeft") this.ignore = false;
                if (this.jsevent.key == "ArrowRight") this.ignore = false;

                if (this.jsevent.key == "Alt") {this.ignore = true; this.alt = false;}
                if (this.jsevent.key == "Meta") {this.ignore = true; this.meta = false;}
                if (this.jsevent.key == "Shift") {this.ignore = true; this.shift = false;}
                if (this.jsevent.key == "Control") {this.ignore = true; this.ctrl = false;}

                if (this.ctrlkey != null) this.ignore = false;

            break;

            case "keypress":

                this.ignore = true;
                this.key = this.jsevent.key;

                if (this.jsevent.key.length == 1)
                    this.printable = true;

            break;

            case "keydown":

                this.ignore = true;
                this.prevent = false;
                this.printable = false;

                this.ctrlkey = null;
                this.funckey = null;

                this.key = this.jsevent.key;

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