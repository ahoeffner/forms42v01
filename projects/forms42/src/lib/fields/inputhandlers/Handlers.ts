import { Type } from '@angular/core';
import { FormField } from '../interfaces/FormField';
import { TextField } from '../inputhandlers/TextField';


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


    public static set(id:string, clazz:Type<FormField>) : void
    {
        Handlers.handlers.set(id.toLowerCase(),clazz);
    }


    public static get(id:string) : Type<FormField>
    {
        return(Handlers.handlers.get(id.toLowerCase()));
    }
}