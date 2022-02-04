import { Context } from "../application/Context";

export const injectable = (id?:string) => 
{
    function define(comp: any) 
    {
        Context.factory.addClass(id,comp);
    }
    
    return (define);
}