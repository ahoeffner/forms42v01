import { Type } from '@angular/core';
import { Component } from './interfaces/Component';
import { ComponentFactory as Factory } from './interfaces/ComponentFactory'; 
import { NGComponentFactory as Angular } from '../angular/NGComponentFactory'; 


export class ComponentFactory
{
    private factory:Factory = new Angular();

    private definitions:Map<string,ComponentDefinition> = 
        new Map<string,ComponentDefinition>();


    public addComponent(id: string, clazz: Type<any>) : void 
    {
        if (id == null) id = clazz.name.toLowerCase();
        this.definitions.set(id,new ComponentDefinition(this.factory,clazz));
    }


    public getComponent(id: string, inst: string) : Component 
    {
        if (id == null) throw "Cannot resolve component 'null'";
        let def:ComponentDefinition = this.definitions.get(id.toLowerCase());
        if (def == null) throw "No injectable component mapped to '"+id+"'";
        return(def.getInstance(inst));
    }
}


class ComponentDefinition
{
    private instances:Map<string,Component> =
        new Map<string,Component>();

    constructor(private factory:Factory, private clazz:Type<any>) {}

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