import { Components } from "../application/Components";

export const mainclass = () => 
{
    function define(comp: any) 
    {
        Components.main(comp);
    }
    
    return (define);
}