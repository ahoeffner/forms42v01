import { Type } from "@angular/core";
import { Forms42App } from "./Forms42App";


export class Forms42
{    
    public enable() : void
    {
        Forms42App.main.enable();
    }
    
    public disable() : void
    {
        Forms42App.main.disable();
    }

    public showform(path:Type<any> | string) : void
    {
        Forms42App.main.display(path);
    }
}