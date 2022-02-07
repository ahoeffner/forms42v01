import { Form } from "./Form";
import { Field } from "../fields/Field";

export class FormPrivate
{
    private form$:Form = null;

    
    constructor(form:Form)
    {
        this.form$ = form;
    }


    public form() : Form
    {
        return(this.form$);
    }


    public addField(field:Field) : void
    {
        console.log("Added field "+field);
    }
}