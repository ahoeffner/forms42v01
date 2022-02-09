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
    private field$:FormField = null;
    private fieldinst$:FieldInstance = null
    

    constructor(field:FieldInstance)
    {
        this.fieldinst$ = field;
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

    public fieldinst() : FieldInstance
    {
        return(this.fieldinst$);
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

        if (this.field$ != null)
        {
            replace = true;
            value = this.field$.getValue();
            this.field$.getElement().remove();
        }
        
        this.type$ = type;
        let ftype:Type<FormField> = Handlers.get(type);

        this.field$ = new ftype();
        this.field$.eventhandler(this.onEvent);
        this.field$.setElement(this.impl$.implementation());

        if (replace) this.field$.setValue(value);
        this.impl$.placeholder().appendChild(this.field$.getElement());

        this.field$.setStyle(this.impl$.style);
    }

    private onEvent(event:any) : void
    {
        console.log("event: "+event.type);
    }

    private getType(name:string) : FieldType
    {
        if (name == null) name = "text";
        let type:FieldType = FieldType[name.toLowerCase() as keyof typeof FieldType];

        if (type == null) 
        {
            type = FieldType.text;
            console.error({message: "No such fieldtype as "+name});
        }

        return(type);
    }
}