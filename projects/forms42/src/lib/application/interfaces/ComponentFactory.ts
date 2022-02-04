import { Type } from "@angular/core";
import { Component } from "./Component";

export interface ComponentFactory
{
    addClass(id:string, clazz:Type<any>) : void;
    getComponent(id:string, inst:string) : Component;
}