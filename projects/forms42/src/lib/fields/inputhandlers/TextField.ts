import { FormField, EventHandler, Event, FieldEvent, getEventType } from "../interfaces/FormField";

export class TextField implements FormField
{
	private handler:EventHandler = null;
	private element:HTMLInputElement = null;


    public getValue() 
    {
        throw new Error("Method not implemented.");
    }

    public setValue(value: any): void 
    {
        throw new Error("Method not implemented.");
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

	public setElement(element: HTMLElement): void 
	{
        if (element == null)
            element = document.createElement("input");

        this.element = element as HTMLInputElement;
        this.addEvents(this.element);
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