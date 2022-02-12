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

import { Component } from '../framework/interfaces/Component';
import { Main as Framework } from '../framework/interfaces/Main';


export class Main
{
    private layer$:number = 0;
	private page$:HTMLDivElement = null;
	private overlay$:HTMLDivElement = null;
	private windows$:HTMLDivElement = null;


    constructor(fw:Framework)
    {
        this.page$ = fw.page();
        this.layer$ = fw.layer();
        this.overlay$ = fw.overlay();
        this.windows$ = fw.windows();

        this.page$.style.zIndex = "" + this.layer$;
		this.overlay$.style.zIndex = "" + (+this.layer$ + 1);
    }


	public showComponent(comp:Component) : void
	{
		this.page$.appendChild(comp.html());
	}


	public removeComponent(comp:Component) : void
	{
		this.page$.removeChild(comp.html());
	}


	public disable() : void
	{
		let width:number = this.page$.offsetWidth;
		let height:number = this.page$.offsetHeight;

		this.overlay$.style.width = width + "px";
		this.overlay$.style.height = height + "px";
	}


	public enable() : void
	{
		this.overlay$.style.width = "0px";
		this.overlay$.style.height = "0px";
	}
}