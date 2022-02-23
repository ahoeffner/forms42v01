/*
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 3 only, as
 * published by the Free Software Foundation.

 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 */

import { Type } from "@angular/core";
import { Handler } from "./Handler";
import { FieldInstance } from "./FieldInstance";
import { FormField } from "./interfaces/FormField";
import { Handlers } from "./inputhandlers/Handlers";
import { FieldInstance as IField } from '../framework/interfaces/FieldInstance';


export class FieldInstancePrivate
{
    private impl$:IField = null;
    private handler$:Handler = null;
    private field$:FormField = null;
    private fieldinst$:FieldInstance = null


    constructor(field:FieldInstance)
    {
        this.fieldinst$ = field;
    }

    public id() : string
    {
        return(this.impl$.attributes().get("id"));
    }

    public row() : number
    {
        let row:string = this.impl$.attributes().get("row");
        if (row == null) row = "-1";
        return(+row);
    }

    public block() : string
    {
        let block:string = this.impl$.attributes().get("block");
        if (block == null) block = "";
        return(block);
    }

    public handler() : string
    {
        return(this.impl$.attributes().get("handler"));
    }

    public fieldinst() : FieldInstance
    {
        return(this.fieldinst$);
    }

    public setImplementation(impl:IField)
    {
        this.impl$ = impl;
        this.setHandler(this.handler());
    }

    public setHandler(name:string) : void
    {
        let value:any = null;
        let style:string = null;
        let classes:string = null;

        let replace:boolean = false;
        let handler:Handler = this.getHandler(name);

        if (handler == this.handler$)
            return;

        if (this.field$ != null)
        {
            replace = true;
            value = this.field$.getValue();
            style = this.field$.getStyle();
            classes = this.field$.getClasses();
            this.field$.detach(this.impl$.tag());
        }

        this.handler$ = handler;
        let ftype:Type<FormField> = Handlers.get(handler);

        this.field$ = new ftype();
        this.field$.setBody(this.impl$.body());
        this.field$.setEventHandler(this.onEvent);
        this.field$.setAttributes(this.impl$.attributes());

        if (replace)
        {
            this.field$.setValue(value);
            this.field$.setStyle(style);
            this.field$.setClasses(classes);
        }

        this.field$.prepare();
        this.field$.attach(this.impl$.tag());
    }

    private onEvent(event:any) : void
    {
        console.log("event: "+event.type);
    }

    private getHandler(name:string) : Handler
    {
        if (name == null) name = "input";
        let type:Handler = Handler[name.toLowerCase() as keyof typeof Handler];

        if (type == null)
        {
            type = Handler.input;
            console.error({message: "No such handler as "+name});
        }

        return(type);
    }
}