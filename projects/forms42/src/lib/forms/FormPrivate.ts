import { Form } from "./Form";
import { FieldInstance } from "../fields/FieldInstance";
import { Form as IForm } from '../framework/interfaces/Form';


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

    public setImplementation(impl:IForm)
    {
    }

    public addFieldInstance(field:FieldInstance) : void
    {
    }
}