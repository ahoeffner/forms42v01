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
 * [rexexp] or
 * predefined classes:
 *  *: any
 *  #: [0-9]
 *  d: [0-9,.+-]
 *  c: [a-zA-Z]
 *  a: [a-z]
 *  A: [A-Z]
 *  w: [a-zA-Z_0-9]
 *
 * #      : digit
 * a[ul] : letter u:upper l:lower i:ignore
 * *[ul] : any printable u:upper l:lower i:ignore
 * w[ul] : word character u:upper l:lower i:ignore a-z 0-9
 */

import { Pattern, Field as FieldToken } from "../Pattern";

export class FieldPattern implements Pattern
{
    private pos:number = 0;
    private plen:number = 0;
    private value:string = "";
    private fields:Field[] = [];
    private placeholder$:string = "";

    private tokens:Map<number,Token> = new Map<number,Token>();

    constructor(pattern:string, placeholder?:string)
    {
        let pos:number = 0;
        let field:Field = null;
        let fixed:boolean = true;

        for(let i = 0; i < pattern.length; i++)
        {
            let c:string = pattern.charAt(i);

            if (c == '{')
            {
                fixed = false;
                field = new Field(this);
                this.fields.push(field);
                field.fn = this.fields.length - 1;
                field.fr = this.placeholder$.length;
                continue;
            }

            if (c == '}')
            {
                fixed = true;
                field.to = this.placeholder$.length-1;
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

            if (this.fields.length == 0)
                throw "No input fields defined";
        }

        if (placeholder == null)
        {
            placeholder = this.placeholder$;
        }
        else
        {
            let len:number = placeholder.length;
            let req:number = this.placeholder$.length;

            if (len < req)
            {
                for(let i = 0; i < (req - len); i++)
                    placeholder += " ";
            }

            this.placeholder$ = placeholder;
        }

        this.value = placeholder;
        this.plen = this.value.length;
    }

    public size() : number
    {
        return(this.plen);
    }

    public isNull(): boolean
    {
        for (let i = 0; i < this.fields.length; i++)
        {
            if (!this.fields[i].isNull())
                return(false);
        }

        return(true);
    }

    public getValue() : string
    {
        return(this.value);
    }

    public placeholder() : string
    {
        return(this.placeholder$);
    }

    public getPosition(): number
    {
        return(this.pos);
    }

    public validate() : void
    {
    }

    public getField(n:number) : Field
    {
        return(this.fields[n]);
    }

    public findField(pos:number) : Field
    {
        if (pos == null) pos = this.pos;

        for (let i = 0; i < this.fields.length; i++)
        {
            let field:Field = this.fields[i];
            if (pos >= field.fr && pos <= field.to)
                return(field);
        }
        return(null);
    }

    public input(pos:number) : boolean
    {
        if (pos < 0 || pos > this.placeholder$.length-1)
            return(false);

        let token:Token = this.tokens.get(pos);
        return(token.type != 'f');
    }

    public setValue(value:any) : void
    {
        if (value == null)
        {
            value = this.placeholder$;
            return;
        }

        let pos:number = 0;
        let fmt:string[] = [];

        for(let i = 0; i < this.plen && pos < value.length; i++)
        {
            let c:string = value.charAt(i);
            let p:string = this.placeholder$.charAt(i);

            pos++;
            fmt.push(c);
        }

        value = "";
        fmt.forEach((c) => {value += c});

        for (let i = value.length; i < this.plen; i++)
            value += this.placeholder$.charAt(i);

        this.value = value;
        this.clear();
    }

    public setPosition(pos:number) : boolean
    {
        if (pos < 0 || pos >= this.plen)
            return(false);

        if (this.tokens.get(pos).type != 'f')
        {
            this.pos = pos;
            return(true);
        }

        return(false);
    }

    public setCharacter(pos:number, c:string) : boolean
    {
        if (!this.setPosition(pos))
            return(false);

        let token:Token = this.tokens.get(this.pos);
        if (token == null || !token.validate(c)) return(false);

        if (token.case == 'u') c = c.toUpperCase();
        if (token.case == 'l') c = c.toLowerCase();

        let a:string = this.value.substring(this.pos+1);
        let b:string = this.value.substring(0,this.pos);

        this.setValue(b + c + a);
        this.clear(pos);

        return(true);
    }

    public delete(fr:number, to:number) : string
    {
        if (fr == to)
        {
            fr--;
            if (fr < 0) return(this.value);

            if (!this.setPosition(fr))
                return(this.value);
        }

        let p:string = "";
        let a:string = this.value.substring(to);
        let b:string = this.value.substring(0,fr);

        for(let i = fr; i < to; i++)
            p += this.placeholder$.charAt(i);

        this.setPosition(fr);
        this.value = b + p + a;

        this.clear();
        return(this.value);
    }

    public getFieldArea(pos:number) : number[]
    {
        if (pos >= this.plen)
            pos = this.plen - 1;

        let fr:number = pos;
        let to:number = pos;
        let token:Token = this.tokens.get(pos);

        if (token.type == 'f')
        {
            let dist1:number = 0;
            let dist2:number = 0;

            while(fr > 0 && this.tokens.get(fr).type == 'f') fr--;
            while(to < this.placeholder$.length-1 && this.tokens.get(to).type == 'f') to++;

            dist1 = pos - fr;
            dist2 = to - pos;

            if (dist2 < dist1)
                fr = to;

            to = fr;
        }

        while(fr > 0 && this.tokens.get(fr).type != 'f') fr--;
        while(to < this.placeholder$.length-1 && this.tokens.get(to).type != 'f') to++;

        if (this.tokens.get(fr).type == 'f') fr++;
        if (this.tokens.get(to).type == 'f') to--;

        return([fr,to]);
    }

    public prev(printable:boolean) : number
    {
        if (this.setPosition(this.pos-1))
            return(this.pos);

        let pos = this.pos - 1;

        if (!printable && pos >= 0)
        {
            this.pos = pos;
            return(this.pos);
        }

        while(pos > 0)
        {
            if (this.input(pos))
            {
                this.pos = pos;
                break;
            }

            pos--;
        }

        return(this.pos);
    }

    public next(printable:boolean) : number
    {
        if (this.setPosition(this.pos+1))
            return(this.pos);

        let pos = this.pos + 1;

        if (!printable && pos < this.plen)
        {
            this.pos = pos;
            return(this.pos);
        }

        while(pos < this.plen-1)
        {
            if (this.input(pos))
            {
                this.pos = pos;
                break;
            }

            pos++;
        }

        return(this.pos);
    }

    private clear(pos?:number) : boolean
    {
        let empty:boolean = true;

        if (pos != null)
        {
            let field:Field = this.findField(pos);
            empty = this.clearfield(field);
        }
        else
        {
            for (let i = 0; i < this.fields.length; i++)
            {
                let field:Field = this.fields[i];
                if (!this.clearfield(field))
                    empty = false;
            }
        }

        return(empty);
    }

    private clearfield(field:Field) : boolean
    {
        let empty:boolean = true;

        for(let i = field.fr; i <= field.to; i++)
        {
            let c:string = this.value.charAt(i);
            let p:string = this.placeholder$.charAt(i);
            if (c != ' ' && c != p) {empty = false; break;}
        }

        if (empty)
        {
            let plh:string = this.placeholder$;
            plh = plh.substring(field.fr,field.to+1);
            for(let i = field.fr; i <= field.to; i++)
            this.value = this.replace(this.value,field.fr,plh);
            return(true);
        }

        for(let i = field.fr; i <= field.to; i++)
        {
            let c:string = this.value.charAt(i);

            if (c != this.placeholder$.charAt(i))
            {
                for(let j = field.fr; j <= field.to; j++)
                {
                    if (this.value.charAt(j) == this.placeholder$.charAt(j))
                        this.value = this.replace(this.value,j,' ');
                }
                return(false);
            }
        }

        return(false);
    }

    private getstring(fr:number,to:number) : string
    {
        return(this.value.substring(fr,to));
    }

    private setstring(pos:number,value:string) : void
    {
        this.value = this.replace(this.value,pos,value);
    }

    public replace(str:string,pos:number,val:string) : string
    {
        return(str.substring(0,pos) + val + str.substring(pos+val.length));
    }
}


class Field implements FieldToken
{
    fn:number = 0;
    fr:number = 0;
    to:number = 0;

    constructor(private pattern:FieldPattern)
    {
    }

    public pos() : number
    {
        return(this.fr);
    }

    public size(): number
    {
        return(this.to - this.fr + 1);
    }

    public isNull() : boolean
    {
        let empty:boolean = true;
        let value:string = this.pattern.getValue();
        let pattern:string = this.pattern.placeholder();

        for (let i = 0; i < pattern.length; i++)
        {
            let c:string = value.charAt(i);
            let p:string = pattern.charAt(i);
            if (c != p && c != ' ') {empty = false; break;}
        }

        return(empty);
    }

    public getValue() : string
    {
        return(this.pattern["getstring"](this.fr,this.to));
    }

    public setValue(value:string) : void
    {
        let pattern:string = this.pattern.placeholder();

        if (value == null)
            value = pattern.substring(this.fr,this.to+1);

        if (value.length > this.to - this.fr + 1)
            value = value.substring(0,this.to+1);

        while(value.length < this.to - this.fr + 1)
            value += ' ';

        this.pattern["setstring"](this.fr,value);
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