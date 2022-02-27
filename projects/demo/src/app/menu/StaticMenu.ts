import { Menu, MenuEntry } from "./Definition";

export class StaticMenu implements Menu
{
    public name:string;

    private data:MenuEntry =
    {
        id: 0,
        name: "Danmark",
        content:
        [
            {
                id: 1,
                name: "Jylland",
                content: null
            }
            ,
            {
                id: 2,
                name: "Sjælland",
                content: null
            }
            ,
            {
                id: 3,
                name: "Fyn",
                content: null
            }
            ,
            {
                id: 4,
                name: "Øerne",
                content: null
            }
        ]
    }


    constructor(name:string,data:MenuEntry)
    {
        this.name = name;
        //this.data = data;
    }


    public show(path:string): string
    {
        return("<a class='menu' href='#' path='/1/2'>Test</a>");
    }
}