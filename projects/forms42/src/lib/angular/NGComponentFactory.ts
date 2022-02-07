import { Builder } from './Builder';
import { NGComponent } from './NGComponent';
import { ComponentRef, Type } from '@angular/core';
import { ComponentFactory } from '../framework/interfaces/ComponentFactory';


export class NGComponentFactory implements ComponentFactory
{
    //public static form:Form = null;
    public static builder:Builder = null;


    public newInstance(clazz: Type<any>) : NGComponent 
    {
        let ref:ComponentRef<any> = NGComponentFactory.builder.createComponent(clazz);
        return(new NGComponent(ref));
    }
}