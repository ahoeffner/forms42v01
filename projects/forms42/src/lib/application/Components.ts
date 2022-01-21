import { Builder } from "./Builder";
import { Form } from "../forms/Form";
import { ComponentRef, Type } from "@angular/core";


export class Components
{
    private static builder:Builder = null;

    private static classes:Map<string,Component> =
        new Map<string,Component>();

    
    public static setBuilder(builder:Builder) : void
    {
        Components.builder = builder;
    }


    public createComponent(component:Type<any> | object) : ComponentRef<any>
    {
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
            this.path = "/"+clazz.name;

        if (clazz.prototype instanceof Form)
            this.form = true;
    }
}