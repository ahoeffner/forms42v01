import { Pattern } from "../Pattern";

export class FieldPattern implements Pattern
{
    private pos:number = 0;

    constructor(fields:FieldToken|FieldToken[], private pattern:string)
    {
    }

    public getPattern(): string 
    {
        return(this.pattern);
    }

    public delete(pos: number): number 
    {
        return(pos);    
    }

    public setPosition(pos: number): number 
    {
        this.pos = pos;   
        return(this.pos); 
    }

    public setCharacter(pos: number, c: string): string 
    {
        this.setPosition(pos);
        return(null);
    }

    public prev(): number 
    {
        return(this.pos);
    }

    public next(): number 
    {
        return(this.pos);
    }

    public validate(value: string) : void
    {
        throw new Error("Method not implemented.");
    }

    public getObject(value: any) : any
    {
        throw new Error("Method not implemented.");
    }   

    public getValue(value: any): string 
    {
        return(value);
    }
}


export interface FieldToken
{
    pos() : number;
    length():number;

    getValue(value:any) : string;
    validate(value:string) : void;

    prev() : number;
    next() : number;

    delete(pos:number) : number;
    setPosition(pos:number) : number;
    setCharacter(pos:number, c:string) : string;
}