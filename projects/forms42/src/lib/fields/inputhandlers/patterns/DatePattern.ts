import { Pattern } from "../Pattern";

export class DatePattern implements Pattern
{
    private pos:number = 0;
    private value:string = null;
    private pattern:string = null;
    private format:string = "dd-mm-yyyy";


    constructor()
    {
        this.pattern = "";
        let format:string = this.format.toLowerCase();

        for(let i = 0; i < format.length; i++)
        {
            let c = format.charAt(i);
            if (c >= 'a' && c <= 'z') this.pattern += " ";
            else                      this.pattern += this.format.charAt(i); 
        }

        this.value = this.pattern;
    }

    public setPosition(pos: number): void 
    {
        this.pos = pos;    
    }

    public setCharacter(pos: number, c: string): string 
    {
        this.pos = pos;
        let a:string = this.value.substring(pos+1);
        let p:string = this.value.substring(0,pos-1);
        this.value = p + c + a;
        return(this.value);
    }

    public prev(): number 
    {
        if (this.pos <= 0) return(0);
        while(this.pos >= 0 && this.pattern.charAt(this.pos) == ' ') this.pos--;
        return(this.pos);
    }

    public next(): number 
    {
        let len:number = this.pattern.length;

        if (this.pos >= len) return(0);
        while(this.pos < len && this.pattern.charAt(this.pos) == ' ') this.pos++;
        return(this.pos);
    }

    public input(): boolean 
    {
        return(this.pattern.charAt(this.pos) == ' ');
    }

    public validate(value: string) 
    {
        throw new Error("Method not implemented.");
    }

    public getObject(value: any) 
    {
        throw new Error("Method not implemented.");
    }   

    public getValue(value: any): string 
    {
        if (value == null) value = this.pattern;
        this.value = value;
        return(value);
    }
}