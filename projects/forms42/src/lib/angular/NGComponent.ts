import { Component } from '../framework/interfaces/Component';
import { ComponentRef, EmbeddedViewRef, Type } from '@angular/core';


export class NGComponent implements Component
{
    constructor(private ref:ComponentRef<any>) {}

    instance(): object 
    {
        return(this.ref.instance);
    }


    html(): HTMLElement 
    {
        return((this.ref.hostView as EmbeddedViewRef<any>).rootNodes[0]);
    }
}