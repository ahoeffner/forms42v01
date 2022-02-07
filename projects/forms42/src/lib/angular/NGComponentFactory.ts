import { Builder } from './Builder';
import { Form } from '../forms/Form';
import { NGComponent } from './NGComponent';
import { ComponentRef, Type } from '@angular/core';
import { ComponentFactory } from '../framework/interfaces/ComponentFactory';


export class NGComponentFactory implements ComponentFactory
{
    public form:Form = null;
    public builder:Builder = null;


    public newInstance(clazz: Type<any>) : NGComponent 
    {
        let ref:ComponentRef<any> = this.builder.createComponent(clazz);
        return(new NGComponent(ref));
    }
}