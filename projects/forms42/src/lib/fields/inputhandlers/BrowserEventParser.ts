import { keyframes } from "@angular/animations";

export class BrowserEventParser
{
    constructor(private jsevent:any)
    {
        if (jsevent.type.startsWith("key")) this.parseKeyEvent();
    }


    private parseKeyEvent() : void
    {
        if (this.jsevent.type == "keyup")
        {
            if (this.jsevent.key == "Alt" || this.jsevent.key == "Shift" || this.jsevent.key == "Control")
                return;
                
            if (this.jsevent.key.length == 1) console.log("Printable "+this.jsevent.key.lenght);
            else console.log(this.jsevent.key);
        }
    }
}