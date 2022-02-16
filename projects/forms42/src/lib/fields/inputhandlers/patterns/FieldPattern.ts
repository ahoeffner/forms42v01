import { Pattern } from "../Pattern";

export class FieldPattern implements Pattern
{
    private pos:number = 0;
    private object:any = null;
    private value:string = "";

    constructor(fields:FieldToken|FieldToken[], private pattern:string)
    {
    }

    setValue(value:string) : void 
    {
        if (value == null)
            value = this.pattern;

        this.value = value;
    }

    setObject(value:any) : void 
    {
        if (value == null)
            value = this.pattern;

        this.value = value;
    }

    public placeholder() : string 
    {
        return(this.pattern);
    }

    public delete(fr:number, to:number) : void 
    {
    }

    public setPosition(pos: number) : number 
    {
        this.pos = pos;   
        return(this.pos); 
    }

    public setCharacter(pos: number, c: string) : string 
    {
        this.setPosition(pos);
        return(null);
    }

    public prev() : number 
    {
        if (this.pos > 0) this.pos--;
        return(this.pos);
    }

    public next() : number 
    {
        if (this.pos < this.pattern.length) this.pos++;
        return(this.pos);
    }

    public validate() : void
    {
        throw new Error("Method not implemented.");
    }

    public getObject() : any
    {
        throw new Error("Method not implemented.");
    }   

    public getValue() : string 
    {
        return(this.value);
    }
}


export interface FieldToken
{
    pos : number;
    length:number;

    getValue(value:any) : string;
    validate(value:string) : void;

    prev() : number;
    next() : number;

    delete(pos:number) : number;
    setPosition(pos:number) : number;
    setCharacter(pos:number, c:string) : string;
}