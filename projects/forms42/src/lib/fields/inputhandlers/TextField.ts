import { Common } from "./Common";
import { FormField, EventHandler, Event, getEventType } from "../interfaces/FormField";


export class TextField extends Common implements FormField
{
	private element:HTMLElement = null;
	private handler:EventHandler = null;
	private input:HTMLInputElement = null;


    constructor()
    {
        super();
        this.setBase(this);
    }


    public getValue() 
    {
        return(this.input.value);
    }

    public setValue(value: any): void 
    {
        this.input.value = value;
    }

    public setProperties(properties: any): void 
	{
        throw new Error("Method not implemented.");
    }

    public setValidValues(values: Set<any> | Map<any, any>): void 
	{
        throw new Error("Method not implemented.");
    }
    
	public enable(flag: boolean): void 
	{
        throw new Error("Method not implemented.");
    }

    public readonly(flag: boolean): void 
	{
        throw new Error("Method not implemented.");
    }
    
	public validate(): boolean 
	{
        throw new Error("Method not implemented.");
    }

    public eventhandler(handler: EventHandler): void 
	{
		this.handler = handler;
    }

	public getElement(): HTMLElement 
	{
		return(this.element);
	}

    public getStyleElement(): HTMLElement 
    {
        return(this.input);
    }

	public setElement(element: HTMLElement): void 
	{
        if (element == null) 
        {
            this.element = document.createElement("input");
            this.input = this.element as HTMLInputElement;
        }
        else
        {
            this.element = element;
            console.log("Element: "+this.element.constructor.name+" input: "+(this.element instanceof HTMLInputElement));

            if (this.element instanceof HTMLInputElement) this.input = this.element;
            else                                          this.input = element.querySelector('input');    
        }

        this.addEvents(this.input);
	}


    private onEvent(jsevent:any) : void
    {
        let event:Event = {type: getEventType(jsevent), event: jsevent};
        this.handler(event);
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