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

import { Builder } from './Builder';
import { Main } from '../application/Main';
import { Context } from '../application/Context';
import { NGComponentFactory } from './NGComponentFactory';
import { Main as IMain } from '../framework/interfaces/Main';
import { ComponentFactory } from '../application/ComponentFactory';
import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
	selector: 'f42-main',
	template: 
	`
	FormsLibrary V23
	<div #windows class="windows"></div>
    <div class="canvas">
      <div #page class="page"></div>
      <div #modal class="page modal"></div>
    </div>
  `,
  styles: 
	[
	`
		.canvas
		{
			position: relative;
		}

		.windows
		{
			top: 0;
			left: 0;
			position: absolute;
		}

		.page
		{
			top: 0;
			left: 0;
			position: absolute;
		}

		.modal
		{
			width: 0;
			height: 0;
		}
	`  
	]
	})


export class NGMain implements IMain, OnInit
{
	private layer$:number = 0;
	private page$:HTMLDivElement = null;
	private overlay$:HTMLDivElement = null;
	private windows$:HTMLDivElement = null;

	@ViewChild("page",{read: ElementRef, static: true}) private pelem:ElementRef;
	@ViewChild("modal",{read: ElementRef, static: true}) private melem:ElementRef;
	@ViewChild("windows",{read: ElementRef, static: true}) private welem:ElementRef;


	constructor(private viewref:ViewContainerRef)
	{
	}


	public ngOnInit(): void 
	{
		this.page$ = this.pelem.nativeElement;
		this.overlay$ = this.melem.nativeElement;
		this.windows$ = this.welem.nativeElement;

		Context.main = new Main(this);
		let factory:NGComponentFactory = new NGComponentFactory();

		factory.builder = new Builder(this.viewref);
		Context.factory = new ComponentFactory(factory);
	}


	public layer() : number
	{
		return(this.layer$);
	}


	public page() : HTMLDivElement
	{
		return(this.page$);
	}


	public overlay() : HTMLDivElement
	{
		return(this.overlay$);
	}


	public windows() : HTMLDivElement
	{
		return(this.windows$);
	}
}
