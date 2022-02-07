import { Form as IForm } from '../framework/interfaces/Form';

export class Form
{
    private fw:IForm = null;


    public test() : void
    {
        console.log("Form.fw -> "+this.fw);
    }
}