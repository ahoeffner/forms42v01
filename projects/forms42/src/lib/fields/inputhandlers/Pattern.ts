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
    getPattern() : string;

    getObject(value:any) : any;
    getValue(value:any) : string;
    validate(value:string) : void;

    prev() : number;
    next() : number;

    delete(pos:number) : number;
    setPosition(pos:number) : number;
    setCharacter(pos:number, c:string) : string;
}