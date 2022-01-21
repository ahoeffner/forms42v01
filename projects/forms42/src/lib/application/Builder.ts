import { ComponentFactoryResolver, ComponentRef, Injectable, Injector, Type } from "@angular/core";


@Injectable({
    providedIn: 'root',
})


export class Builder
{
    constructor(private factory:ComponentFactoryResolver, private injector:Injector) {}  

    public createComponent(component:Type<any> | object) : ComponentRef<any>
    {
        if (!(component instanceof Type)) component = component.constructor;
        return(this.factory.resolveComponentFactory(component as Type<any>).create(this.injector));
    }
}