import { Builder } from './Builder';
import { NGComponent } from './NGComponent';
import { Context } from '../application/Context';
import { Main } from '../framework/interfaces/Main';
import { NGComponentFactory } from './NGComponentFactory';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'f42-main',
	template: 
	`
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


export class NGMain implements OnInit, Main 
{
	private layer:number = 0;
	private page:HTMLDivElement = null;
	private modal:HTMLDivElement = null;
	private windows:HTMLDivElement = null;

	@ViewChild("page",{read: ElementRef, static: true}) private pelem:ElementRef;
	@ViewChild("modal",{read: ElementRef, static: true}) private melem:ElementRef;
	@ViewChild("windows",{read: ElementRef, static: true}) private welem:ElementRef;


	constructor(builder:Builder) 
	{
		Context.main = this;
		NGComponentFactory.builder = builder;
	}


	public ngOnInit(): void 
	{
		this.page = this.pelem.nativeElement;
		this.modal = this.melem.nativeElement;
		this.windows = this.welem.nativeElement;
		this.page.style.zIndex = "" + this.layer;
		this.modal.style.zIndex = "" + (+this.layer + 1);
	}


	public showComponent(comp:NGComponent) : void
	{
		this.page.appendChild(comp.html());
	}


	public removeComponent(comp:NGComponent) : void
	{
		this.page.removeChild(comp.html());
	}


	public disable() : void
	{
		let width:number = this.page.offsetWidth;
		let height:number = this.page.offsetHeight;

		this.modal.style.width = width + "px";
		this.modal.style.height = height + "px";
	}


	public enable() : void
	{
		this.modal.style.width = "0px";
		this.modal.style.height = "0px";
	}
}
