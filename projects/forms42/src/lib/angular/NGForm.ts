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
import { NGComponentFactory } from './NGComponentFactory';
import { Form as IForm } from '../framework/interfaces/Form';
import { Component, AfterViewInit, OnInit } from "@angular/core";

@Component({template: ''})


export class NGForm extends Form implements IForm, OnInit, AfterViewInit
{
    public ngOnInit(): void 
    {
        this["__priv__"].setImplementation(this);
        (Context.factory.factory() as NGComponentFactory).form = this["__priv__"];
    }


    public ngAfterViewInit(): void 
    {
    }
}