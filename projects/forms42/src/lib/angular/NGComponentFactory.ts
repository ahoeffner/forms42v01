import { Builder } from './Builder';
import { Type } from '@angular/core';
import { Component } from '../application/interfaces/Component';
import { ComponentFactory as ComponentFactory } from '../application/interfaces/ComponentFactory';


export class NGComponentFactory implements ComponentFactory
{
    public static builder:Builder = null;


    public addClass(id: string, clazz: Type<any>) : void 
    {
        throw new Error('Method not implemented.');
    }
  

    getComponent(id: string, inst: string) : Component 
    {
        return(null);
    }
}