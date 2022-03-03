import { Menu } from "./Menu";
import { MenuImplementation } from "../framework/interfaces/MenuImplementation";

export class MenuPrivate
{
    private pub$:Menu;
    private classes:string = null;
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

        this.toggle(null);
    }


    public toggle(path:string) : void
    {
        let html:string = "";

        if (path == null)
        {
            (this.impl().tag().childNodes[1] as Element).innerHTML = html;
            return;
        }
    }
}