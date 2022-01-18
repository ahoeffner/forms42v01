import { Type } from "@angular/core";
import { Form } from "../forms/Form";

export class Components
{
    private static mainclass:Type<any> = null;

    private static classes:Map<string,Component> =
        new Map<string,Component>();


    public static main(clazz?:Type<any>) : Type<any>
    {
        if (clazz != null) 
            Components.mainclass = clazz;

        return(Components.mainclass);
    }
        

    public static add(name:string, clazz:Type<any>) : void
    {
        console.log("from library");
        let comp:Component = new Component(name,clazz);
        Components.classes.set(comp.name,comp);
    }
        

    public static get(name:string) : Component
    {
        return(Components.classes.get(name));
    }
}


export class Component
{
    public name:string = null;
    public form:boolean = false;
    public clazz:Type<any> = null;
    
    constructor(name:string, clazz:Type<any>)
    {
        this.name = name;
        this.clazz = clazz;

        if (this.name == null)
            this.name = clazz.name;

        if (clazz.prototype instanceof Form)
            this.form = true;
    }
}