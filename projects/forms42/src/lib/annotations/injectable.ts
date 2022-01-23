import { Components } from "../application/Components";

export const injectable = (id?:string) => 
{
    function define(comp: any) 
    {
        Components.add(id,comp);
    }
    
    return (define);
}