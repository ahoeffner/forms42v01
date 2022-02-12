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

import { Builder } from './Builder';
import { NGComponent } from './NGComponent';
import { FormPrivate } from '../forms/FormPrivate';
import { ComponentRef, Type } from '@angular/core';
import { ComponentFactory } from '../framework/interfaces/ComponentFactory';


export class NGComponentFactory implements ComponentFactory
{
    public form:FormPrivate = null;
    public builder:Builder = null;


    public newInstance(clazz: Type<any>) : NGComponent 
    {
        let ref:ComponentRef<any> = this.builder.createComponent(clazz);
        return(new NGComponent(ref));
    }
}