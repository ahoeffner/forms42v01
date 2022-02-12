/*
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 3 only, as
 * published by the Free Software Foundation.

 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 */

export interface FormField
{
    getValue() : any;
    setValue(value:any) : void;

    validate() : boolean;

    getElement() : HTMLElement;
    setElement(element:HTMLElement) : void;

    getStyle() : string;
    setStyle(style:string) : void;
    getStyleElement() : HTMLElement;

    addClass(clazz:string) : void;
    removeClass(clazz:string) : void;

    getClasses() : string;
    setClasses(classes:string) : void;

    getProperties() : any;
    setProperties(properties:any) : void;

    getValidValues() : Set<any> | Map<any, any> 
    setValidValues(values:Set<any>|Map<any,any>) : void;

    enable(flag:boolean) : void;
    readonly(flag:boolean) : void;

    getEventHandler() : EventHandler;
    setEventHandler(handler:EventHandler) : void;
}


export interface EventHandler
{
    (event:Event) : void;
}


export interface Event
{
    type:FieldEvent;
    event:any;
}


export enum FieldEvent
{
    Key,
    Mouse,
    Enter,
    Leave,
    Change,
    Changed,
    Custom
}


export function getEventType(type:string) : FieldEvent
{
    return(FieldEvent.Change);
}