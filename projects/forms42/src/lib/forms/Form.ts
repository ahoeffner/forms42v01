import { Form as IForm } from '../framework/interfaces/Form';
import { FormPrivate } from './FormPrivate';

export class Form
{
    private __fw__:IForm = null;
    private __priv__:FormPrivate = null;


    constructor()
    {
        this.__priv__ = new FormPrivate(this);
    }


    public test() : void
    {
        console.log("Form.fw -> "+this.__fw__);
    }
}