import { Type } from "@angular/core";
import { FieldType } from "./FieldTypes";
import { FieldInstance } from "./FieldInstance";
import { FormField } from "./interfaces/FormField";
import { Handlers } from "./inputhandlers/Handlers";
import { FieldInstance as IField } from '../framework/interfaces/FieldInstance';


export class FieldInstancePrivate
{
    private impl$:IField = null;
    private type$:FieldType = null;
    private ffield$:FormField = null;
    private field$:FieldInstance = null
    

    constructor(field:FieldInstance)
    {
        this.field$ = field;
    }

    public id() : string
    {
        return(this.impl$.id);
    }

    public row() : number
    {
        return(+this.impl$.row);
    }

    public name() : string
    {
        return(this.impl$.name);
    }

    public block() : string
    {
        return(this.impl$.block);
    }

    public field() : FieldInstance
    {
        return(this.field$);
    }

    public setImplementation(impl:IField)
    {
        this.impl$ = impl;
        this.setType(impl.type);
    }

    public setType(name:string) : void
    {
        let value:any = null;
        let replace:boolean = false;
        let type:FieldType = this.getType(name);

        if (type == this.type$)
            return;

        if (this.ffield$ != null)
        {
            replace = true;
            value = this.ffield$.getValue();
            this.ffield$.getElement().remove();
        }
        
        this.type$ = type;
        let ftype:Type<FormField> = Handlers.get(type);

        this.ffield$ = new ftype();
        this.ffield$.eventhandler(this.onEvent);
        this.ffield$.setElement(this.impl$.implementation());

        if (replace) this.ffield$.setValue(value);
        this.impl$.placeholder().appendChild(this.ffield$.getElement());

        this.ffield$.setClasses("x1 x2");
        console.log("classlist "+this.ffield$.getClasses());
    }

    private onEvent(event:any) : void
    {
        console.log("event: "+event.type);
    }

    private getType(name:string) : FieldType
    {
        if (name == null) name = "text";
        return(FieldType[name.toLowerCase() as keyof typeof FieldType]);
    }
}