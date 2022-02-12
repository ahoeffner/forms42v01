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

import { ComponentRef, Directive, Injectable, Type, ViewContainerRef } from "@angular/core";

@Directive({})
@Injectable({providedIn: 'root',})


export class Builder
{
    constructor(private viewref:ViewContainerRef) {}  

    public createComponent(component:Type<any> | object) : ComponentRef<any>
    {
        if (!(component instanceof Type)) component = component.constructor;
        return(this.viewref.createComponent(component as Type<any>));
    }
}