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

import { Field } from "./Field";
import { Handler } from "./Handler";
import { Type } from "@angular/core";
import { Handlers } from "./inputhandlers/Handlers";
import { FieldBinding} from "./interfaces/FieldBinding";
import { FieldImplementation } from '../framework/interfaces/FieldImplementation';


export class FieldPrivate
{
    private pub$:Field = null;
    private handler$:Handler = null;
    private field$:FieldBinding = null;
    private impl$:FieldImplementation = null;


    constructor(field:Field)
    {
        this.pub$ = field;
    }

    public pub() : Field
    {
        return(this.pub$);
    }

    public impl() : FieldImplementation
    {
        return(this.impl$);
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

    public setImplementation(impl:FieldImplementation)
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
        let ftype:Type<FieldBinding> = Handlers.get(handler);

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