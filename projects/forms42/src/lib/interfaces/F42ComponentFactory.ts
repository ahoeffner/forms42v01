import { F42Component } from "../application/F42Component";

export interface F42ComponentFactory
{
    getComponent(id:string, inst:string) : F42Component;
}