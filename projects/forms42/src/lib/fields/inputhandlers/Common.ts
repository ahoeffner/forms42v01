import { FormField } from "../interfaces/FormField";


export class Common
{
    private field:FormField = null;

    public setBase(field:FormField) : void
    {
        this.field = field;
    }

    public getStyle(): string 
    {
        return(this.field.getStyleElement().style.cssText);
    }

    public setStyle(style: string): void 
    {
        this.field.getStyleElement().style.cssText = style;
    }

    addClass(clazz:string) : void
    {
        this.field.getStyleElement().classList.add(clazz);
    }

    removeClass(clazz:string) : void
    {
        this.field.getStyleElement().classList.remove(clazz);
    }

    public getClasses(): string 
    {
        return(this.field.getStyleElement().classList.value);
    }

    public setClasses(classes: string): void 
    {
        this.field.getStyleElement().classList.value = classes;
    }
}