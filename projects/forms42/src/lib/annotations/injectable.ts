import { Context } from "../application/Context";

export const injectable = (id?:string) => 
{
    function define(comp: any) 
    {
        Context.factory.addComponent(id,comp);
    }
    
    return (define);
}