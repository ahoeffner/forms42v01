import { Type } from "@angular/core";
import { Component } from "./Component";

export interface ComponentFactory
{
    newInstance(clazz:Type<any>) : Component;
}