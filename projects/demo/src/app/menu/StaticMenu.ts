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
        let open:boolean = this.status.get(path);

        if (open)
        {
            this.status.set(path,false);
        }
        else
        {
            this.status.clear();
            let road:string[] = this.split(path);

            for (let i = 0; i < road.length; i++)
                this.status.set(road[i],true);
        }

        let data:MenuEntry = Menus.data.get(this.name);

        let html:string = null;
        html = this.build("/",data);

        return(html);
    }


    private build(path:string,data:MenuEntry) : string
    {
        let html:string = "<div>";
        let open:boolean = this.status.get(path);

        console.log("path: "+path+" open: "+open);

        if (!open || data.entries == null)
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

        console.log("path: <"+path+"> split: "+split.length);
        split.forEach((elem) => {console.log("split <"+elem+">")});

        parts.push("/");
        split.forEach((elem) =>
        {
            if (elem.length > 0)
            {
                road += elem + "/";
                parts.push(road);
            }
        });

        parts.forEach((e) => {console.log("e: "+e)})

        return(parts);
    }
}