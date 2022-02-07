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