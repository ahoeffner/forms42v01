import { StaticMenu } from "./StaticMenu";
import { Component, ElementRef, ViewChild } from "@angular/core";


@Component
({
	selector: 'menu',
	template:
	`
        <span #tag></span>
        <span #body style="display: none"><ng-content></ng-content></span>
    `
})


export class Menu
{
    private name:string = null;
    private classes:string = null;

	private body$:HTMLElement = null;
	private ctag$:HTMLSpanElement = null;
    private attributes$:Map<string,string> = new Map<string,string>();

    @ViewChild("tag",{read: ElementRef, static: true}) private telem:ElementRef;
    @ViewChild("body",{read: ElementRef, static: true}) private belem:ElementRef;

    constructor(elem:ElementRef)
    {
        let tag:HTMLElement = elem.nativeElement;
        tag.getAttributeNames().forEach((attr:string) =>
        {
            if (!attr.startsWith("_"))
            {
                let value:string = tag.getAttribute(attr);
                this.attributes$.set(attr,value);
            }
        });

        this.name = this.attributes().get("name");
        this.classes = this.attributes().get("classes");
    }

    public ngOnInit(): void
    {
		this.ctag$ = this.telem.nativeElement;
		this.body$ = this.belem.nativeElement.childNodes[0];

        this.belem.nativeElement.remove();

        let classes:string = "menu-container";
        if (this.classes != null) classes += " "+this.classes;

        let link:Element = this.body$.getRootNode().firstChild as Element;

        if (link instanceof Text)
        {
            let text:string = link.textContent;
            link = document.createElement("a");
            link.append(text);
        }

        link.addEventListener("click", () => {this.toggle('/');});

        let container:Element = document.createElement("div");
        container.classList.value = classes;

        this.tag().innerHTML = "";
        this.tag().appendChild(link);
        this.tag().appendChild(container);

        this.toggle(null);
    }

    public tag(): HTMLSpanElement
    {
        return(this.ctag$);
    }

    public body(): HTMLSpanElement
    {
        return(this.body$);
    }

    public attributes(): Map<string, string>
    {
        return(this.attributes$);
    }


    private menu:StaticMenu = null;

    public toggle(path:string) : void
    {
        if (this.menu == null)
            this.menu = new StaticMenu(this.name,this.classes);

        let html:string = "";

        if (path != null)
            html += this.menu.toggle(path);

        (this.tag().childNodes[1] as Element).innerHTML = html;
        let entries:HTMLCollectionOf<Element> = this.tag().getElementsByClassName("menu-entry");

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
        this.menu.action(action);
    }
}