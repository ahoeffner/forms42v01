import { Menus } from "./Menus";
import { Menu, MenuEntry } from "./Definition";


export class StaticMenu implements Menu
{
    public name:string;
    public classes:string;
    private status:Map<string,boolean> = new Map<string,boolean>();

    constructor(name:string,classes:string)
    {
        this.name = name;
        this.classes = "menu-entry";
        if (classes != null) this.classes += " "+classes;
    }

    public toggle(path:string): string
    {
        let open:boolean = this.open(path);
        let data:MenuEntry = Menus.data.get(this.name);

        this.status.clear();
        let road:string[] = this.split(path);

        for (let i = 0; i < road.length; i++)
            this.open(road[i],true);

        if (open)
            this.open(path,false);

        return(this.build("/",data));
    }

    public action(action?: string) : void
    {
        console.log("action: "+action);
    }

    private build(path:string,data:MenuEntry) : string
    {
        let html:string = "<div class='menu-entry-list'>";

        if (!this.open(path) || !data.active || data.entries == null)
            return("");

        for (let i = 0; i < data.entries.length; i++)
        {
            if (data.entries[i].entries != null)
            {
                html += "<a class='"+this.classes+"' path='"+path+i+"'>"+data.entries[i].name+"</a>";
                if (data.entries[i].entries != null) html += this.build(path+i+"/",data.entries[i]);
            }
            else
            {
                html += "<a class='"+this.classes+" menu-action' action='"+data.entries[i].command+"'>"+data.entries[i].name+"</a>";
            }
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