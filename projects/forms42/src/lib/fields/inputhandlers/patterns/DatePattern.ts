import { FieldPattern, FieldToken } from "./FieldPattern";

export class DatePattern extends FieldPattern
{
    private static getTokens() : FieldToken[]
    {
        let tokens:FieldToken[] = [];
        tokens[0] = new DayToken(0);
        tokens[1] = new DayToken(3);
        tokens[2] = new DayToken(6);
        return(tokens);
    }


    constructor()
    {
        super(DatePattern.getTokens(),"  -  -  ");
        /*
        this.pattern = "";
        let format:string = this.format.toLowerCase();

        for(let i = 0; i < format.length; i++)
        {
            let c = format.charAt(i);
            if (c >= 'a' && c <= 'z') this.pattern += " ";
            else                      this.pattern += this.format.charAt(i); 
        }

        this.value = this.pattern;
        */
    }


    public override getPattern(): string 
    {
        return("dd-mm-yyyy");
    }
}


export class DayToken implements FieldToken
{
    constructor(private pos$:number) {}

    public pos(): number 
    {
        return(this.pos$);
    }

    getObject(value: any) {
        throw new Error("Method not implemented.");
    }
    getValue(value: any): string {
        throw new Error("Method not implemented.");
    }
    validate(value: string): void {
        throw new Error("Method not implemented.");
    }
    prev(): number {
        throw new Error("Method not implemented.");
    }
    next(): number {
        throw new Error("Method not implemented.");
    }
    delete(pos: number): number {
        throw new Error("Method not implemented.");
    }
    setPosition(pos: number): number {
        throw new Error("Method not implemented.");
    }
    setCharacter(pos: number, c: string): string {
        throw new Error("Method not implemented.");
    }
    public length() : number
    {
        return(2);
    }
}
