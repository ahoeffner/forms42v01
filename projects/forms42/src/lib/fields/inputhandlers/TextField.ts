import { Common } from "./Common";
import { BrowserEventParser } from "./BrowserEventParser";
import { FormField, EventHandler, Event, getEventType } from "../interfaces/FormField";


export class TextField extends Common implements FormField
{
	private element:HTMLElement = null;
	private input:HTMLInputElement = null;


    constructor()
    {
        super();
        this.setBase(this);
    }

    public getValue() : any
    {
        return(this.input.value);
    }

    public setValue(value: any) : void 
    {
        this.input.value = value;
    }
    
	public validate() : boolean 
	{
        throw new Error("Method not implemented.");
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

            if (this.element instanceof HTMLInputElement) this.input = this.element;
            else                                          this.input = element.querySelector('input');    
        }

        this.addEvents(this.input);
	}


    private onEvent(jsevent:any) : void
    {
        let buble:boolean = false;

        let parser:BrowserEventParser = new BrowserEventParser(jsevent);

        console.log(jsevent.type+" "+this.getValue());

        if (buble)
        {
            let handler:EventHandler = this.getEventHandler();
            let event:Event = {type: getEventType(jsevent), event: jsevent};
            handler(event);
        }
    }


    private addEvents(element:HTMLElement) : void
    {
        element.addEventListener("blur", (event) => {this.onEvent(event)});
        element.addEventListener("focus", (event) => {this.onEvent(event)});
        element.addEventListener("change", (event) => {this.onEvent(event)});

        element.addEventListener("keyup", (event) => {this.onEvent(event)});
        element.addEventListener("keydown", (event) => {this.onEvent(event)});
        element.addEventListener("keypress", (event) => {this.onEvent(event)});

        element.addEventListener("mouseout", (event) => {this.onEvent(event)});
        element.addEventListener("mouseover", (event) => {this.onEvent(event)});

        element.addEventListener("click", (event) => {this.onEvent(event)});
        element.addEventListener("dblclick", (event) => {this.onEvent(event)});
    }
}