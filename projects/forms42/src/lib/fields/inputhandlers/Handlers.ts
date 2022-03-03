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

import { Type } from '@angular/core';
import { Handler } from '../Handler';
import { InputField } from './InputField';
import { FieldBinding } from '../interfaces/FieldBinding';


export class Handlers
{
    private static handlers:Map<String,Type<FieldBinding>> = Handlers.defaults();

    private static defaults() : Map<String,Type<FieldBinding>>
    {
        let handlers:Map<String,Type<FieldBinding>> =
            new Map<String,Type<FieldBinding>>();

        handlers.set("input",InputField);

        return(handlers);
    }

    public static set(type:Handler, clazz:Type<FieldBinding>) : void
    {
        let id:string = Handler[type];
        Handlers.handlers.set(id.toLowerCase(),clazz);
    }

    public static get(type:Handler) : Type<FieldBinding>
    {
        let id:string = Handler[type];
        let ftype:Type<FieldBinding> = Handlers.handlers.get(id.toLowerCase());
        if (ftype == null) ftype = InputField;
        return(ftype);
    }
}