import { Components } from "../application/Components";

export const injectable = (path?:string) => 
{
    function define(comp: any) 
    {
        Components.add(path,comp);
    }
    
    return (define);
}