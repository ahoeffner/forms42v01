import { Context } from "./Context";
import { Component } from "../framework/interfaces/Component";


export class Forms42
{
    public showform(id:string, inst?:string) : void
    {
        let comp:Component = Context.factory.getComponent(id,inst);
        Context.main.showComponent(comp);
    }
}