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
    public key:string = null;
    public ignore:boolean = false;
    public prevent:boolean = false;
    public printable:boolean = false;

    public alt:boolean = false;
    public ctrl:boolean = false;
    public meta:boolean = false;
    public shift:boolean = false;


    constructor(private jsevent$:any)
    {
        if (jsevent$.type.startsWith("key")) this.parseKeyEvent();
    }


    public get type() : string
    {
        return(this.jsevent.type);
    }


    public get jsevent() : any
    {
        return(this.jsevent$);
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
                        this.printable = true;
                        this.key = this.jsevent.key;
                    }
                }
            break;

            case "keydown":
                this.ignore = false;
                this.prevent = false;
                this.printable = false;

                this.key = this.jsevent.key;
                this.alt = this.jsevent.altKey;
                this.ctrl = this.jsevent.ctrlKey;
                this.meta = this.jsevent.metaKey;
                this.shift = this.jsevent.shiftKey;

                if (this.jsevent.key == "Alt") this.ignore = true;
                if (this.jsevent.key == "Meta") this.ignore = true;
                if (this.jsevent.key == "Shift") this.ignore = true;
                if (this.jsevent.key == "Control") this.ignore = true;

                if (this.jsevent.key == "Tab") this.prevent = true;
                if (this.jsevent.key == "ArrowUp") this.prevent = true;
                if (this.jsevent.key == "ArrowDown") this.prevent = true;
            break;
        }
    }


    public toString() : string
    {
        return(this.type+" prevent: "+this.prevent+" ignore: "+this.ignore+" printable: "+this.printable+" key: "+this.key);
    }
}