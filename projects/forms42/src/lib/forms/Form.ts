import { FormPrivate } from './FormPrivate';

export class Form
{
    private __priv__:FormPrivate = null;


    constructor()
    {
        this.__priv__ = new FormPrivate(this);
    }
}