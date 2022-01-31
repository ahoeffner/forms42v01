import { state } from "@angular/animations";
import { State } from "./State";

export class Forms42
{    
    private static instance:Forms42 = null;

    public static get() : Forms42
    {
        if (Forms42.instance == null)
            Forms42.instance = new Forms42();
            
        return(Forms42.instance);
    }


    private constructor() 
    {
    }


    public enable() : void
    {
        State.main.enable();
    }
    
    public disable() : void
    {
        State.main.disable();
    }

    public showform(id:string, inst?:string) : void
    {
        if (inst == null) inst = "";
        State.main.showComponent(id,inst);
    }

    public showWindow(id:string, modal:boolean, inst?:string) : void
    {
        if (inst == null) inst = "";
        State.main.showWindow(id,inst,modal,1);
    }

    public sleep(ms:number) : Promise<void>
    {
        return(new Promise(resolve => setTimeout(resolve,ms)));
    }
}