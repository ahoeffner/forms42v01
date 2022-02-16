/*
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 3 only, as
 * published by the Free Software Foundation.

 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 */

/*
 * #      : digit
 * a[ul] : letter u:upper l:lower i:ignore
 * *[ul] : any printable u:upper l:lower i:ignore
 * w[ul] : word character u:upper l:lower i:ignore a-z 0-9
 */

import { Pattern } from "../Pattern";

export class FieldPattern implements Pattern
{
    private pos:number = 0;
    private value:string = "";
    private insert:boolean = false;
    private placeholder$:string = "";

    private token:Token = null;
    private tokens:Map<number,Token> = new Map<number,Token>();

    constructor(pattern:string)
    {
        let pos:number = 0;
        let fixed:boolean = true;

        for(let i = 0; i < pattern.length; i++)
        {
            let c:string = pattern.charAt(i);

            if (c == '{')
            {
                fixed = false;
                continue;
            }

            if (c == '}')
            {
                fixed = true;
                continue;
            }

            if (fixed)
            {
                this.placeholder$ += c;
                this.tokens.set(pos++,new Token("f"));
                continue;
            }

            if (!(c == '#' || c == '*' || c == 'a' || c == 'w'))
                throw "unknown pattern "+c;

            let token:Token = new Token(c);

            if (i < pattern.length - 1)
            {
                let mod:string = pattern.charAt(i+1);
                if (mod == 'u' || mod == 'l')
                {
                    i++;
                    token.setCase(mod);
                }
            }

            this.placeholder$ += " ";
            this.tokens.set(pos++,token);
        }

        this.value = this.placeholder$;
        this.token = this.tokens.get(0);
    }

    setValue(value:string) : void
    {
        if (value == null)
            value = this.placeholder$;

        this.value = value;
    }

    setObject(value:any) : void
    {
        this.setValue(value+"");
    }

    public placeholder() : string
    {
        return(this.placeholder$);
    }

    public delete(fr:number, to:number) : boolean
    {
        if (fr == to)
        {
            fr--;
            if (!this.setPosition(fr))
                return(false);
        }

        let a:string = this.value.substring(to);
        let b:string = this.value.substring(0,fr);

        this.value = b + " " + a;
        return(true);
    }

    public setPosition(pos:number) : boolean
    {
        if (pos < 0 || pos > this.placeholder$.length-1)
            return(false);

        let token:Token = this.tokens.get(pos);

        if (token.type == 'f')
            return(false);

        this.pos = pos;
        this.token = token;

        return(true)
    }

    public setCharacter(pos:number, c:string) : boolean
    {
        if (!this.setPosition(pos))
            return(false);

        let token:Token = this.tokens.get(this.pos);
        if (token == null || !token.validate(c)) return(false);

        if (token.case == 'u') c = c.toUpperCase();
        if (token.case == 'l') c = c.toLowerCase();

        this.pad(this.pos);
        let off:number = this.insert ? 0 : 1;
        let a:string = this.value.substring(this.pos+off);
        let b:string = this.value.substring(0,this.pos);
        this.value = b + c + a;

        return(true);
    }

    public prev() : number
    {
        if (this.pos <= 0)
            return(this.pos);

        if (this.setPosition(this.pos-1))
            return(this.pos);

        let pos = this.pos - 1;

        while(pos > 0 && !this.allowed(pos))
            pos--;

        if (!this.allowed(pos))
        {
            while(pos < this.placeholder$.length-1 && !this.allowed(pos))
                pos++;
        }

        this.setPosition(pos);
        return(this.pos);
    }

    public next() : number
    {
        console.log("next "+this.pos);
        
        if (this.pos >= this.placeholder$.length)
            return(this.pos);

        if (this.setPosition(this.pos+1))
            return(this.pos);

        let pos = this.pos + 1;

        console.log("find next pos: "+pos);
        while(pos < this.placeholder$.length-1 && !this.allowed(pos))
            pos++;

        if (!this.allowed(pos))
        {
            while(this.pos > 0 && !this.allowed(pos))
                pos--;
        }

        this.setPosition(pos);
        return(this.pos);
    }

    public validate() : void
    {
    }

    public getObject() : any
    {
        return(this.getValue());
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

    private allowed(pos:number) : boolean
    {
        let token:Token = this.tokens.get(pos);
        console.log("allowed "+pos+" "+token);
        return(token.type != 'f');
    }
}


class Token
{
    type$:string = 'f';
    case$:string = 'i';

    constructor(type:string)
    {
        this.type$ = type;
    }

    public get type() : string
    {
        return(this.type$)
    }

    public get case() : string
    {
        return(this.case$)
    }

    public setType(type:string) : Token
    {
        this.type$ = type;
        return(this);
    }

    public setCase(uli:string) : Token
    {
        this.case$ = uli;
        return(this);
    }

    public validate(c:string) : boolean
    {
        let lc:string = c.toLowerCase();

        switch(this.type$)
        {
            case "*": return(true);
            case "f": return(false);
            case "#": return(+c >= 0 && +c <= 9);
            case "a": return(lc >= 'a' && lc <= 'z');
            case "w": return((lc >= 'a' && lc <= 'z') || (+c >= 0 && +c <= 9));
        }

        return(false)
    }

    public toString() : string
    {
        return(this.type$+"["+this.case$+"]");
    }
}