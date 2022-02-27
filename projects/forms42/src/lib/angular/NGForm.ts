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

import { Form } from '../forms/Form';
import { Context } from '../application/Context';
import { Component, OnInit } from "@angular/core";
import { NGComponentFactory } from './NGComponentFactory';
import { Form as FormDef } from '../framework/interfaces/Form';

@Component({template: ''})

export class NGForm extends Form implements FormDef, OnInit
{
    public ngOnInit(): void
    {
        this["__priv__"].setImplementation(this);
        (Context.factory.factory() as NGComponentFactory).form = this["__priv__"];
    }
}