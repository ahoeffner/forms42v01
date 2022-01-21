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
}