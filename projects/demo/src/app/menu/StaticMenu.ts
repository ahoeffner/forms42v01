import { Menu, MenuEntry } from "./Definition";

export class StaticMenu implements Menu
{
    public name:string;
    public data:MenuEntry;
    public classes:string;

    private testdata:MenuEntry =
    {
        name: "Danmark",
        entries:
        [
            {
                name: "Jylland",
                entries:
                [
                    {
                        name: "Sønderborg",
                        command: "/soenderborg"
                    }
                    ,
                    {
                        name: "Århus",
                        entries:
                        [
                            {
                                name: "Syd",
                                command: "/aahus/syd"
                            }
                            ,
                            {
                                name: "Nord",
                                command: "/aahus/nord"
                            }
                        ]
                    }
                    ,
                    {
                        name: "Skagen",
                        command: "/skagen"
                    }
                ]
            }
            ,
            {
                name: "Sjælland",
                entries:
                [
                    {
                        name: "København",
                        command: "/kopenhavn"
                    }
                    ,
                    {
                        name: "Hørsholm",
                        command: "/horsholm"
                    }
                ]
            }
            ,
            {
                name: "Fyn",
                command: "/fyn"
            }
            ,
            {
                name: "Øerne",
                command: "/oerne"
            }
        ]
    }


    constructor(name:string,data:MenuEntry)
    {
        this.name = name;
        this.data = this.testdata;
    }


    public show(path:string): string
    {
        let html:string = null;
        if (path == "/") path = "";
        let classes:string = "menu";
        let root:MenuEntry = this.find(path);
        if (this.classes != null) classes+" "+this.classes;

        console.log("path: "+path+" root: "+root.entries);

        if (root.entries == null)
        {
            console.log("goto "+root.command);
        }
        else
        {
            html = "";
            for (let i = 0; i < root.entries.length; i++)
                html += "<a class='"+classes+"' href='#' path='"+path+"/"+i+"'>"+root.entries[i].name+"</a>"
        }

        return(html);
    }


    private find(path:string) : MenuEntry
    {
        let road:string[] = path.split("/");
        let data:MenuEntry = this.testdata;

        for (let i = 0; i < road.length; i++)
        {
            if (road[i] != "")
                data = data.entries[+road[i]];
        }

        return(data);
    }
}