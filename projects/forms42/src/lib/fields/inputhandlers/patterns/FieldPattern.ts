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
 * a[uli] : letter u:upper l:lower i:ignore
 * *[uli] : any printable u:upper l:lower i:ignore
 * w[uli] : word character u:upper l:lower i:ignore a-z 0-9
 */

import { Pattern } from "../Pattern";

export class FieldPattern implements Pattern
{
    private cpos:number = 0;
    private value:string = "";
    private insert:boolean = true;
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
                this.tokens.set(pos++,new Token("f"));
                continue;
            }

            if (!(c == '#' || c == '*' || c == 'a' || c == 'w'))
                throw "unknown pattern "+c;

            let token:Token = new Token(c);

            if (i < pattern.length - 1)
            {
                let mod:string = pattern.charAt(i+1);
                if (mod == 'u' || mod == 'l' || mod == 'i')
                {
                    i++;
                    token.setCase(mod);
                }
            }

            this.tokens.set(pos++,token);
        }

        this.tokens.forEach((token,pos) =>
        {
            console.log(pos+" "+token);
        });
    }

    setValue(value:string) : void
    {
        if (value == null) value = "";
        this.value = value;
    }

    setObject(value:any) : void
    {
        this.setValue(value+"");
    }

    public placeholder() : string
    {
        return(null);
    }

    public delete(fr:number, to:number) : string
    {
        if (fr == to) fr--;
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
        return(this.cpos);
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

    public toString() : string
    {
        return(this.type$+"["+this.case$+"]");
    }
}