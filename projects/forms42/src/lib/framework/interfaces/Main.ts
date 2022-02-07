import { Component } from "./Component";

export interface Main
{
    enable() : void;
    disable() : void;
	showComponent(comp:Component) : void
	removeComponent(comp:Component) : void
}