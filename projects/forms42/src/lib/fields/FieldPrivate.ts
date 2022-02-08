import { Field } from "./Field";

export class FieldPrivate
{
    private field$:Field

    
    constructor(field:Field)
    {
        this.field$ = field;
    }

    public field() : Field
    {
        return(this.field$);
    }
}