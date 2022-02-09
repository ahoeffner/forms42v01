export interface FormField
{
    getValue() : any;
    setValue(value:any) : void;

    getElement() : HTMLElement;
    setElement(element:HTMLElement) : void;

    getStyle() : string;
    setStyle(style:string) : void;
    getStyleElement() : HTMLElement;

    addClass(clazz:string) : void;
    removeClass(clazz:string) : void;

    getClasses() : string;
    setClasses(classes:string) : void;

    setProperties(properties:any) : void;
    setValidValues(values:Set<any>|Map<any,any>) : void;

    enable(flag:boolean) : void;
    readonly(flag:boolean) : void;

    validate() : boolean;
    eventhandler(handler:EventHandler) : void;
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