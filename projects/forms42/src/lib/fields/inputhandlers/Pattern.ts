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

export interface Pattern
{
    length() : number;
    placeholder() : string;

    getValue() : string;
    setValue(value:any) : void;

    validate() : void;
    input(pos:number) : boolean;

    prev(printable:boolean) : number;
    next(printable:boolean) : number;

    getPosition() : number;
    getField(pos?:number) : number;
    setPosition(pos:number) : boolean;
    getFieldArea(pos:number) : number[];
    delete(fr:number,to:number) : string;
    setCharacter(pos:number, c:string) : boolean;
}