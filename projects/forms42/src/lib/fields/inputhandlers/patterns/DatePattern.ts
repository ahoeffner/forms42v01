import { Pattern } from "../Pattern";

export class DatePattern implements Pattern
{
    private cpos:number = 0;
    private value:string = "";
    private insert:boolean = true;

    setValue(value:string) : void 
    {
        if (value == null) value = "";
        this.value = value;
    }

    setObject(value:any) : void 
    {
        throw new Error("Method not implemented.");
    }

    public placeholder() : string 
    {
        return(null);
    }

    public delete(fr:number, to:number) : string 
    {
        let a:string = this.value.substring(to);
        let b:string = this.value.substring(0,fr);
        this.value = b + a;
        return(this.value);
    }

    public setPosition(pos:number) : number 
    {
        this.cpos = pos;
        return(this.cpos);
    }

    public setCharacter(pos:number, c:string) : string 
    {
        this.setPosition(pos);

        this.pad(this.cpos);
        let off:number = this.insert ? 0 : 1;
        let a:string = this.value.substring(this.cpos+off);
        let b:string = this.value.substring(0,this.cpos);
        this.value = b + c + a;

        return(this.value);
    }


    public prev() : number 
    {
        if (this.cpos > 0) this.cpos--;
        return(this.cpos);
    }

    public next(): number 
    {
        this.setPosition(this.cpos+1);
        console.log("next "+(this.cpos));
        return(this.cpos);
    }

    public validate(): void {
        throw new Error("Method not implemented.");
    }
    public getObject() {
        throw new Error("Method not implemented.");
    }


    public getValue() : string 
    {
        return(this.value);
    }


    private pad(length:number) : void
    {
        while(this.value.length < length)
            this.value += "";
    }
}