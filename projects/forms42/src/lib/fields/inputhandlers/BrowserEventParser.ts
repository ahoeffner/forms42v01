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
    public ignore:boolean = false;
    public prevent:boolean = false;
    public printable:boolean = false;


    constructor(private jsevent:any)
    {
        if (jsevent.type.startsWith("key")) this.parseKeyEvent();
    }


    private parseKeyEvent() : void
    {
        if (this.jsevent.type == "keyup")
        {
            if (this.jsevent.key == "Alt" || this.jsevent.key == "Shift" || this.jsevent.key == "Control")
            {
                this.ignore = true;
                return;
            }

            if (this.jsevent.key.length == 1)
            {
                this.prevent = true;
                this.printable = true;
                console.log("Printable: "+this.jsevent.key);
                return;
            }
        }

        if (this.jsevent.type == "keydown")
        {
            console.log("keydown "+this.jsevent.key);
            if (this.jsevent.key == "Tab") this.prevent = true;
        }
    }
}