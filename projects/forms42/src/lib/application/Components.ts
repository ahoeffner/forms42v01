import { Builder } from "./Builder";
import { Form } from "../forms/Form";
import { ComponentRef, EmbeddedViewRef, Type } from "@angular/core";


export class Components
{
    public static builder:Builder = null;

    private static classes:Map<string,Component> =
        new Map<string,Component>();


    public static node(component:ComponentRef<any>) : HTMLElement
    {
        return((component.hostView as EmbeddedViewRef<any>).rootNodes[0]);
    }


    public static createComponent(component:Type<any> | object | string) : ComponentRef<any>
    {
        if (typeof(component) == "string")
        {
            let comp:Component = Components.classes.get(component);
            if (comp == null) throw("No component mapped to path: "+component);
            component = comp.clazz;
        }

        return(Components.builder.createComponent(component));
    }


    public static add(path:string, clazz:Type<any>) : void
    {
        let comp:Component = new Component(path,clazz);
        Components.classes.set(comp.path,comp);
    }
        

    public static get(path:string) : Component
    {
        return(Components.classes.get(path));
    }
}


export class Component
{
    public path:string = null;
    public form:boolean = false;
    public clazz:Type<any> = null;
    
    constructor(path:string, clazz:Type<any>)
    {
        this.path = path;
        this.clazz = clazz;

        if (this.path == null)
            this.path = "/"+clazz.name.toLowerCase();

        if (!this.path.startsWith("/"))
            this.path = "/" + this.path;

        if (clazz.prototype instanceof Form)
            this.form = true;
    }
}