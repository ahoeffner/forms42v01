import { Menu, MenuEntry } from "./Definition";
import { Menus } from "./Menus";

export class StaticMenu implements Menu
{
    public name:string;
    public classes:string;
    private status:Map<string,boolean> = new Map<string,boolean>();

    constructor(name:string,classes:string)
    {
        this.name = name;
        this.classes = "menu "+this.name;
        if (classes != null) this.classes += " "+classes;
        this.status.set("/",true);
    }


    public show(path:string): string
    {
        let data:MenuEntry = Menus.data.get("test");
        let html:string = null;
        html = this.build("/",data);
        return(html);
    }


    private build(path:string,data:MenuEntry) : string
    {
        let html:string = "<div>";

        for (let i = 0; i < data.entries.length; i++)
        {
            html += "<a class='"+this.classes+"' href='#' path='"+path+i+"'>"+data.entries[i].name+"</a>";
            if (data.entries[i].entries != null) html += this.build(path+i+"/",data.entries[i]);
        }

        return(html+= "</div>");
    }


    private split(path:string) : string[]
    {
        let road:string[] = [];
        let split:string[] = path.trim().split("/");

        road.push("/");
        split.forEach((elem) => {if (elem.length > 0) road.push(elem)});

        console.log("path: <"+path+">");
        road.forEach((e) => {console.log("e: "+e)})

        road.push("");

        return(road);
    }
}