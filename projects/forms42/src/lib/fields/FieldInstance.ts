import { FieldInstancePrivate } from './FieldInstancePrivate';


export class FieldInstance
{
    private __priv__:FieldInstancePrivate = null;

    constructor()
    {
        this.__priv__ = new FieldInstancePrivate(this);
    }
}