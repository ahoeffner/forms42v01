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

        this.show("/");
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

    public show(path:string) : void
    {
        if (this.menu == null)
            this.menu = new StaticMenu(this.name,null);

        this.menu.classes = this.classes;
        let html:string = this.menu.show(path);

        if (html != null)
        {
            this.tag().innerHTML = html;

            let entries:HTMLCollectionOf<Element> = this.tag().getElementsByClassName("menu");

            for (let i = 0; i < entries.length; i++)
            {
                let entry:Element = entries.item(i);
                let next:string = entry.getAttribute("path");
                entry.addEventListener("click", () => {this.show(next)});
            }
        }
    }
}