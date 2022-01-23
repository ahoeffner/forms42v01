import { Forms42App } from "./Forms42App";
import { Sleeper } from "../utils/Sleeper";


export class Forms42
{    
    private static instance:Forms42 = null;

    public static async get() : Promise<Forms42>
    {
        while(Forms42App.main == null)
            Forms42.sleep(1);
            
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

    public static sleep(ms:number)
    {
        new Sleeper().sleep(ms);
    }
}