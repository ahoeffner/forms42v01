import { Menu } from "./Menu";
import { Context } from "../application/Context";
import { Provider } from "./interfaces/Provider";
import { MenuEntry } from "./interfaces/MenuEntry";
import { MenuImplementation } from "../framework/interfaces/MenuImplementation";


export class MenuPrivate
{
    private pub$:Menu;
    private classes:string = null;
    private provider:Provider = null;
    private impl$:MenuImplementation = null;
    private status:Map<string,boolean> = new Map<string,boolean>();


    constructor(menu:Menu)
    {
        this.pub$ = menu;
    }

    public pub() : Menu
    {
        return(this.pub$);
    }

    public impl() : MenuImplementation
    {
        return(this.impl$);
    }

    public setImplementation(impl:MenuImplementation)
    {
        this.impl$ = impl;
        this.classes = impl.attributes().get("classes");

        let provider:string = impl.attributes().get("provider");
        this.provider = Context.factory.getNewBeanInstance(provider) as Provider;

        let classes:string = "menu-container";
        if (this.classes != null) classes += " "+this.classes;

        let link:Element = impl.body().getRootNode().firstChild as Element;

        if (link instanceof Text)
        {
            let text:string = link.textContent;
            link = document.createElement("a");
            link.append(text);
        }

        link.addEventListener("click", () => {this.toggle('/');});

        let container:Element = document.createElement("div");
        container.classList.value = classes;

        impl.tag().innerHTML = "";
        impl.tag().appendChild(link);
        impl.tag().appendChild(container);
    }

    public open() : void
    {
        this.status.clear();
        this.toggle("/");
    }

    public close() : void
    {
        this.status.clear();
        (this.impl().tag().childNodes[1] as Element).innerHTML = "";
    }

    public toggle(path:string) : void
    {
        let html:string = "";

        if (path == null)
        {
            (this.impl().tag().childNodes[1] as Element).innerHTML = html;
            return;
        }

        let open:boolean = this.opentree(path);

        this.status.clear();
        let road:string[] = this.split(path);

        for (let i = 0; i < road.length; i++)
            this.opentree(road[i],true);

        if (open) this.opentree(path,false);

        html = this.build("/",this.provider.root());
        (this.impl().tag().childNodes[1] as Element).innerHTML = html;
        let entries:HTMLCollectionOf<Element> = this.impl().tag().getElementsByClassName("menu-entry");

        for (let i = 0; i < entries.length; i++)
        {
            let entry:Element = entries.item(i);
            let next:string = entry.getAttribute("path");
            let action:string = entry.getAttribute("action");

            if (action == null) entry.addEventListener("click",() => {this.toggle(next)});
            else                entry.addEventListener("click",() => {this.action(action)});
        }
    }

    public action(action:string) : void
    {
        if (this.provider.execute(action))
        {
            this.status.clear();
            (this.impl().tag().childNodes[1] as Element).innerHTML = "";
        }
    }

    private build(path:string,entry:MenuEntry) : string
    {
        if (entry == null) return("");
        let html:string = "<div class='menu-entry-list'>";
        let entries:MenuEntry[] = this.provider.entries(path);

        if (!this.opentree(path) || !entry.active || entries == null)
            return("");

        for (let i = 0; i < entries.length; i++)
        {
            if (entries[i].command == null)
            {
                html += "<a class='"+this.classes+"' path='"+path+entries[i].name+"'>"+entries[i].name+"</a>";
                html += this.build(path+i+"/",entries[i]);
            }
            else
            {
                html += "<a class='"+this.classes+" menu-action' action='"+entries[i].command+"'>"+entries[i].name+"</a>";
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

    private opentree(path:string,open?:boolean) : boolean
    {
        if (path.length > 1 && path.endsWith("/"))
            path = path.substring(0,path.length-1);

        if (open != null)
            this.status.set(path,open);

        return(this.status.get(path));
    }
}