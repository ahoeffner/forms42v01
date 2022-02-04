import { Type } from '@angular/core';
import { Component } from './interfaces/Component';
import { ComponentFactory as Factory } from './interfaces/ComponentFactory'; 
import { NGComponentFactory as Angular } from '../angular/NGComponentFactory'; 


export class ComponentFactory implements Factory
{
    private factory:Factory = new Angular();


    public addClass(id: string, clazz: Type<any>) : void 
    {
        this.factory.addClass(id,clazz);
    }


    public getComponent(id: string, inst: string) : Component 
    {
        return(this.factory.getComponent(id,inst));
    }
}