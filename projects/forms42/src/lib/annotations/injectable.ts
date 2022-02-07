import { ComponentFactory } from "../application/ComponentFactory";

export const injectable = (id?:string) => 
{
    function define(comp: any) 
    {
        ComponentFactory.addClass(id,comp);
    }
    
    return (define);
}