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
 * Pattern consists of fixed text and fields enclosed by {}.
 * Fields consists of a list of single character regular expressions.
 * Each expression can be repeated using a preceding multiplier.
 * For shorthand, a number of predefined classes can be used.
 *
 * Example: Flight ID BA-2272
 *
 *  {[A-Z][A-Z]}-{[0-9][0-9][0-9][0-9]}
 * or shorter
 *  {2[A-Z]}-{4[0-9]}
 * or shorter
 *  {AA}-{####}
 * or even shorter
 *  {2A}-{4#}
 *
 * Predefined classes:
 *
 *  *  : any
 *  #  : [0-9]
 *  d  : [0-9,.+-]
 *  a  : [a-z]
 *  A  : [A-Z]
 *  w  : [a-z_0-9]
 *  W  : [A-Z_0-9]
 *  c  : any lowercase character
 *  C  : any uppercase character
 */

import { Pattern as PatternType, Field as IField } from "./interfaces/Pattern";

export class Pattern implements PatternType
{
    private pos:number = 0;
    private plen:number = 0;
    private value:string = "";
    private fields:Field[] = [];
    private placeholder$:string = "";
    private predefined:string = "*#dcaAw";
    private tokens:Map<number,Token> = new Map<number,Token>();

    constructor(pattern:string, placeholder?:string)
    {
        if (placeholder != null) this.setPlaceholder(placeholder);
        if (pattern != null) this.setPattern(pattern);
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

    public setPattern(pattern:string) : void
    {
        let pos:number = 0;
        let placeholder:string = "";

        for (let i = 0; i < pattern.length; i++)
        {
            let c:string = pattern.charAt(i);
            let esc:boolean = this.escaped(pattern,i);

            if (esc)
            {
                let b=i;
                c = pattern.charAt(++i);
            }

            if (c == '{' && !esc)
            {
                let fr:number = i+1;
                while(i < pattern.length && pattern.charAt(++i) != '}');

                if (i == pattern.length)
                    throw "Syntax error in path, non matched {}";

                let def:Token[] = this.parseFieldDefinition(pattern.substring(fr,i));
                this.fields.push(new Field(this,this.fields.length,pos,pos+def.length-1));
                def.forEach((token) => {this.tokens.set(pos++,token); placeholder += ' '});
            }
            else
            {
                placeholder += pattern.charAt(i);
                this.tokens.set(pos++,new Token('f'));
            }
        }

        if (this.fields.length == 0)
            throw "No input fields defined";

        let req:number = placeholder.length;

        if (this.placeholder$ != null)
            placeholder = this.placeholder$;

        while(placeholder.length < req)
            placeholder += ' ';

        if (placeholder.length > req)
            placeholder = placeholder.substring(0,req);

        this.value = placeholder;
        this.plen = placeholder.length;
        this.placeholder$ = placeholder;
    }

    public setPlaceholder(placeholder:string) : void
    {
        let req:number = this.plen;

        while(placeholder.length < req)
            placeholder += ' ';

        if (placeholder.length > req && req > 0)
            placeholder = placeholder.substring(0,req);

        this.placeholder$ = placeholder;
        console.log("placeholder <"+placeholder+">");
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

        switch(token.case)
        {
            case 'u':
                c = c.toUpperCase();
                if (!token.validate(c)) return(false);
            break;

            case 'l':
                c = c.toLowerCase();
                if (!token.validate(c)) return(false);
            break;

            case '?':
                let lc = c.toLocaleLowerCase();
                let uc = c.toLocaleUpperCase();

                if (lc == uc)
                {
                    if (!token.validate(c))
                        return(false);
                }
                else
                {
                    c = lc;
                    if (!token.validate(lc))
                    {
                        c = uc;
                        if (!token.validate(uc))
                            return(false);
                    }
                }
            break;
        }

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

    private parseFieldDefinition(field:string) : Token[]
    {
        let tokens:Token[] = [];

        for (let i = 0; i < field.length; i++)
        {
            let repeat:string = "1";
            let c:string = field.charAt(i);

            if (c >= '0' && c <= '9')
            {
                repeat = "";
                while(c >= '0' && c <= '9' && i < field.length)
                {
                    repeat += c;
                    c = field.charAt(++i);
                }

                if (i == field.length)
                    throw "Syntax error in expression, '"+this.predefined+"' or '[]' expected";
            }
            if (this.predefined.includes(c))
            {
                tokens.push(new Token(c));
            }
            else
            {
                let expr:string = "";

                if (c != '[')
                    throw "Syntax error in expression, '"+this.predefined+"' or '[]' expected";

                c = field.charAt(++i);
                let esc:boolean = false;

                while((c != ']' || esc) && i < field.length)
                {
                    expr += c;
                    c = field.charAt(i+1);
                    esc = this.escaped(field,i++);
                }

                if (c != ']')
                    throw "Syntax error in path, non matched []";

                tokens.push(new Token('x').setRegx("["+expr+"]"));
            }
        }

        return(tokens);
    }

    private escaped(str:string,pos:number) : boolean
    {
        if (pos == str.length+1)
            return(false);

        let e:string = str.charAt(pos);
        let c:string = str.charAt(pos+1);

        return(e == '\\' && c != '\\');
    }
}


class Field implements IField
{
    fn:number = 0;
    fr:number = 0;
    to:number = 0;

    constructor(private pattern:Pattern, fn:number, fr:number, to:number)
    {
        this.fn = fn;
        this.fr = fr;
        this.to = to;
        console.log(fn+" "+fr+" - "+to);
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
    case$:string = '?';
    expr$:string = null;
    regex:RegExp = null;

    constructor(type:string)
    {
        this.setType(type);
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

        switch(type)
        {
            case "c": this.setCase('l'); break;
            case "C": this.setCase('u'); break;
            case "#": this.setRegx("[0-9]"); break;
            case "d": this.setRegx("[0-9,.+-]"); break;
            case "a": this.setRegx("[a-z]").setCase('l'); break;
            case "A": this.setRegx("[A-Z]").setCase('u'); break;
            case "w": this.setRegx("[a-zA-Z_0-9]").setCase('l'); break;
            case "W": this.setRegx("[a-zA-Z_0-9]").setCase('u'); break;
        }

        return(this);
    }

    public setCase(type:string) : Token
    {
        this.case$ = type;
        return(this);
    }

    public setRegx(expr:string) : Token
    {
        this.expr$ = expr;
        this.regex = new RegExp(expr);
        return(this);
    }

    public validate(c:string) : boolean
    {
        switch(this.type$.toLowerCase())
        {
            case "*": return(true);
            case "f": return(false);
            case "c": return(c.toLocaleLowerCase() != c.toLocaleUpperCase());
        }

        return(this.regex.test(c));
    }

    public toString() : string
    {
        return(this.type$+"["+this.case$+"]");
    }
}