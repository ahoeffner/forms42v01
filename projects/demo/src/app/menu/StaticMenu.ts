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
        this.classes = "menu-entry "+this.name;
        if (classes != null) this.classes += " "+classes;
    }


    public show(path:string): string
    {
        let open:boolean = this.open(path);

        this.status.clear();
        let road:string[] = this.split(path);

        for (let i = 0; i < road.length; i++)
            this.open(road[i],true);

        if (open)
            this.open(path,false);

        let data:MenuEntry = Menus.data.get(this.name);

        let html:string = null;
        html = this.build("/",data);

        return(html);
    }


    private build(path:string,data:MenuEntry) : string
    {
        let html:string = "<div>";

        if (!this.open(path) || data.entries == null)
            return("");

        for (let i = 0; i < data.entries.length; i++)
        {
            html += "<a class='"+this.classes+"' href='#' path='"+path+i+"'>"+data.entries[i].name+"</a>";
            if (data.entries[i].entries != null) html += this.build(path+i+"/",data.entries[i]);
        }

        return(html+= "</div>");
    }


    private split(path:string) : string[]
    {
        let road:string = "/";
        let parts:string[] = [];
        let split:string[] = path.trim().split("/");

        parts.push("/");
        split.forEach((elem) =>
        {
            if (elem.length > 0)
            {
                road += elem + "/";
                parts.push(road);
            }
        });

        return(parts);
    }


    private open(path:string,open?:boolean) : boolean
    {
        if (path.length > 1 && path.endsWith("/"))
            path = path.substring(0,path.length-1);

        if (open != null)
            this.status.set(path,open);

        return(this.status.get(path));
    }
}