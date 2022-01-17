import { Components } from "../application/Components";

export const injectable = (name?:string) => 
{
    function define(comp: any) 
    {
        Components.add(name,comp);
    }
    
    return (define);
}