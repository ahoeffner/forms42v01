import { EventHandler, FormField } from "../interfaces/FormField";


export class Common
{
    private properties:any = {};
    private field:FormField = null;
	private handler:EventHandler = null;
    private values: Set<any> | Map<any, any> = null;

    public setBase(field:FormField) : void
    {
        this.field = field;
    }

    public getProperties() : any 
	{
        return(this.properties);
    }

    public setProperties(properties: any) : void 
	{
        this.properties = properties;
    }

    public getEventHandler() : EventHandler
    {
        return(this.handler);
    }

    public setEventHandler(handler: EventHandler): void 
	{
		this.handler = handler;
    }

    public getValidValues() : Set<any> | Map<any, any> 
	{
        return(this.values);
    }

    public setValidValues(values: Set<any> | Map<any, any>) : void 
	{
        this.values = values;
    }

    public readonly(flag: boolean) : void 
	{
        (this.field.getStyleElement() as HTMLInputElement).readOnly = flag;
    }
    
	public enable(flag: boolean) : void 
	{
        (this.field.getStyleElement() as HTMLInputElement).disabled = !flag;
    }

    public getStyle() : string 
    {
        return(this.field.getStyleElement().style.cssText);
    }

    public setStyle(style: string) : void 
    {
        this.field.getStyleElement().style.cssText = style;
    }

    public addClass(clazz:string) : void
    {
        this.field.getStyleElement().classList.add(clazz);
    }

    public removeClass(clazz:string) : void
    {
        this.field.getStyleElement().classList.remove(clazz);
    }

    public getClasses() : string 
    {
        return(this.field.getStyleElement().classList.value);
    }

    public setClasses(classes: string) : void 
    {
        this.field.getStyleElement().classList.value = classes;
    }
}