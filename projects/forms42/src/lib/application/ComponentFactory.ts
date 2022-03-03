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
import { Form } from '../forms/Form';
import { Component } from '../framework/interfaces/Component';
import { ComponentFactory as Factory } from '../framework/interfaces/ComponentFactory';


export class ComponentFactory
{
    private beandef:Map<string,BeanDefinition> =
        new Map<string,BeanDefinition>();

    private static formclasses:Map<string,Type<any>> =
        new Map<string,Type<any>>();

    private static beanclasses:Map<string,Type<any>> =
        new Map<string,Type<any>>();

    private formdef:Map<string,ComponentDefinition> =
        new Map<string,ComponentDefinition>();

    public static addClass(id: string, clazz: Type<any>) : void
    {
        if (id == null) id = clazz.name.toLowerCase();

        if (clazz.prototype instanceof Form)
            ComponentFactory.formclasses.set(id,clazz);

        else ComponentFactory.beanclasses.set(id,clazz);
    }

    constructor(private factory$:Factory)
    {
        ComponentFactory.beanclasses.forEach((clazz,id) =>
        {this.beandef.set(id,new BeanDefinition(clazz));});

        ComponentFactory.formclasses.forEach((clazz,id) =>
        {this.formdef.set(id,new ComponentDefinition(this.factory(),clazz));});

        ComponentFactory.beanclasses.clear();
        ComponentFactory.formclasses.clear();
    }

    public factory() : Factory
    {
        return(this.factory$);
    }

    public getBeanInstance(id: string, inst: string) : any
    {
        if (id == null) throw "Cannot resolve bean 'null'";
        let def:BeanDefinition = this.beandef.get(id.toLowerCase());
        if (def == null) throw "No bean registered to '"+id+"'";
        return(def.getInstance(inst));
    }

    public getNewBeanInstance(id: string) : any
    {
        if (id == null) throw "Cannot resolve bean 'null'";
        let def:BeanDefinition = this.beandef.get(id.toLowerCase());
        if (def == null) throw "No bean registered to '"+id+"'";
        return(def.getNewInstance());
    }

    public getFormInstance(id: string, inst: string) : Component
    {
        if (id == null) throw "Cannot resolve component 'null'";
        let def:ComponentDefinition = this.formdef.get(id.toLowerCase());
        if (def == null) throw "No component registered to '"+id+"'";
        return(def.getInstance(inst));
    }

    public deleteBeanInstance(id: string, inst: string) : void
    {
        if (id == null) throw "Cannot resolve bean 'null'";
        let def:BeanDefinition = this.beandef.get(id.toLowerCase());
        if (def == null) throw "No bean registered to '"+id+"'";
        def.delete(id);
    }

    public deleteFormInstance(id: string, inst: string) : void
    {
        if (id == null) throw "Cannot resolve component 'null'";
        let def:ComponentDefinition = this.formdef.get(id.toLowerCase());
        def.delete(id);
    }
}


class BeanDefinition
{
    private instances:Map<string,any> =
        new Map<string,any>();

    constructor(private clazz:Type<any>) {}

    public delete(id:string) : void
    {
        if (id == null) id = "";
        else id = id.toLowerCase();
        this.instances.delete(id);
    }

    public getInstance(id:string) : any
    {
        if (id == null) id = "";
        else id = id.toLowerCase();

        let comp:any = this.instances.get(id);

        if (comp == null)
        {
            comp = new this.clazz();
            this.instances.set(id,comp);
        }

        return(comp);
    }

    public getNewInstance() : any
    {
        return(new this.clazz());
    }
}


class ComponentDefinition
{
    private instances:Map<string,Component> =
        new Map<string,Component>();

    constructor(private factory:Factory, private clazz:Type<any>) {}

    public delete(id:string) : void
    {
        if (id == null) id = "";
        else id = id.toLowerCase();

        let comp:Component = this.instances.get(id);

        this.factory.detroy(comp);
        this.instances.delete(id);
    }

    public getInstance(id:string) : Component
    {
        if (id == null) id = "";
        else id = id.toLowerCase();

        let comp:Component = this.instances.get(id);

        if (comp == null)
        {
            comp = this.factory.newInstance(this.clazz);
            this.instances.set(id,comp);
        }

        return(comp);
    }
}