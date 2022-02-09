import { FieldType } from "./FieldTypes";
import { FieldInstance } from "./FieldInstance";
import { FieldInstance as IField } from '../framework/interfaces/FieldInstance';


export class FieldInstancePrivate
{
    private impl$:IField = null;
    private type$:FieldType = null;
    private field$:FieldInstance = null
    

    constructor(field:FieldInstance)
    {
        this.field$ = field;
    }

    public field() : FieldInstance
    {
        return(this.field$);
    }

    public setImplementation(impl:IField)
    {
        this.impl$ = impl;
        this.setType(FieldType.text);
    }

    public setType(type:FieldType) : void
    {
        if (type == this.type$)
            return;

        this.type$ = type;
        //let input:HTMLElement = document.createElement('input');

        //this.addEvents(input);
        //this.impl$.placeholder().appendChild(input);
    }

    private onEvent(event:any) : void
    {
        console.log("event: "+event.type);
    }

    private addEvents(element:HTMLElement) : void
    {
        element.addEventListener("blur", (event) => {this.onEvent(event)});
        element.addEventListener("focus", (event) => {this.onEvent(event)});
        element.addEventListener("change", (event) => {this.onEvent(event)});
        element.addEventListener("click", (event) => {this.onEvent(event)});
        element.addEventListener("keydown", (event) => {this.onEvent(event)});
        element.addEventListener("keypress", (event) => {this.onEvent(event)});
        element.addEventListener("dblclick", (event) => {this.onEvent(event)});
    }
}