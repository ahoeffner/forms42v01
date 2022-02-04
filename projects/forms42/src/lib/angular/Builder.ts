import { ComponentRef, Directive, Injectable, Type, ViewContainerRef } from "@angular/core";

@Directive({})
@Injectable({providedIn: 'root',})


export class Builder
{
    constructor(private viewref:ViewContainerRef) {}  

    public createComponent(component:Type<any> | object) : ComponentRef<any>
    {
        if (!(component instanceof Type)) component = component.constructor;
        return(this.viewref.createComponent(component as Type<any>));
    }
}