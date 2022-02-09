import { Type } from '@angular/core';
import { FormField } from '../interfaces/FormField';
import { TextField } from '../inputhandlers/TextField';
import { FieldType } from '../FieldTypes';


export class Handlers
{
    private static handlers:Map<String,Type<FormField>> = Handlers.defaults();

    private static defaults() : Map<String,Type<FormField>>
    {
        let handlers:Map<String,Type<FormField>> =
            new Map<String,Type<FormField>>();

        handlers.set("text",TextField);
        
        return(handlers);
    }


    public static set(type:FieldType, clazz:Type<FormField>) : void
    {
        let id:string = FieldType[type];
        Handlers.handlers.set(id.toLowerCase(),clazz);
    }


    public static get(type:FieldType) : Type<FormField>
    {
        let id:string = FieldType[type];
        let ftype:Type<FormField> = Handlers.handlers.get(id.toLowerCase());
        if (ftype == null) ftype = TextField;
        return(ftype);
    }
}