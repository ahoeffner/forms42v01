import { Builder } from "./Builder";
import { Form } from "../forms/Form";
import { ComponentRef, EmbeddedViewRef, Type } from "@angular/core";


export class Components
{
    public static builder:Builder = null;

    private static classes:Map<string,Component> =
        new Map<string,Component>();


    public static build(component:Type<any>) : ComponentRef<any>
    {
        return(Components.builder.createComponent(component));
    }


    public static getInstance(id:string, inst:string) : ComponentInstance
    {
        let comp:Component = Components.get(id);
        if (comp == null) throw("No component mapped to "+id);
        return(comp.getInstance(inst));
    }


    public static add(id:string, clazz:Type<any>) : Component
    {
        let comp:Component = new Component(id,clazz);
        Components.classes.set(comp.id,comp);
        return(comp);
    }
        

    public static get(id:string) : Component
    {
        return(Components.classes.get(id));
    }
}


export class Component
{
    public id:string = null;
    public form:boolean = false;
    public clazz:Type<any> = null;

    private instances:Map<string,ComponentInstance> =
        new Map<string,ComponentInstance>();
    
    constructor(id:string, clazz:Type<any>)
    {
        this.id = id;
        this.clazz = clazz;

        if (this.id == null)
            this.id = "/"+clazz.name.toLowerCase();

        if (!this.id.startsWith("/"))
            this.id = "/" + this.id;

        if (clazz.prototype instanceof Form)
            this.form = true;
    }


    public getInstance(inst:string) : ComponentInstance
    {
        let cinst:ComponentInstance = this.instances.get(inst);

        if (cinst == null)
        {
            cinst = new ComponentInstance(this);
            this.instances.set(inst,cinst);
        }

        return(cinst);   
    }
}


export class ComponentInstance
{
    public component:Component = null;
    public ref:ComponentRef<any> = null;

    constructor(component:Component)
    {
        this.component = component;
        this.ref = Components.build(component.clazz);
    }

    public node() : HTMLElement
    {
        return((this.ref.hostView as EmbeddedViewRef<any>).rootNodes[0]);
    }
}