import { FieldPrivate } from './FieldPrivate';
import { Field as IField } from '../framework/interfaces/Field';


export class Field
{
    private __fw__:IField = null;
    private __priv__:FieldPrivate = null;


    constructor()
    {
        this.__priv__ = new FieldPrivate(this);
    }
}