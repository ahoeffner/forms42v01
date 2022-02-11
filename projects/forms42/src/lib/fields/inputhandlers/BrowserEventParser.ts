import { keyframes } from "@angular/animations";

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