import { Forms42App } from "./Forms42App";


export class Forms42
{    
    private static instance:Forms42 = null;

    public static get() : Forms42
    {
        if (Forms42.instance == null)
            Forms42.instance = new Forms42();
            
        return(Forms42.instance);
    }


    private constructor() {}

    
    public enable() : void
    {
        Forms42App.main.enable();
    }
    
    public disable() : void
    {
        Forms42App.main.disable();
    }

    public showform(id:string, inst?:string) : void
    {
        if (inst == null) inst = "";
        Forms42App.main.showComponent(id,inst);
    }

    public sleep(ms:number) : Promise<void>
    {
        console.log("Dammm v1");
        return(new Promise(resolve => setTimeout(resolve,ms)));
    }
}