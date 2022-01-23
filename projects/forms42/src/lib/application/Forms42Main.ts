import { Builder } from "./Builder";
import { ComponentInstance, Components } from "./Components";
import { Forms42App } from "./Forms42App";
import { Component, ElementRef, ViewChild, OnInit, ComponentRef, Type } from "@angular/core";


@Component({
  selector: 'f42-main',
  template: 
  `
    <div class="canvas">
      <div #page class="page"></div>
      <div #modal class="page modal"></div>
    </div>
  `,
  styles: [
    `
      .canvas
      {
        position: relative;
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
        z-index: 1;
      }
    `  
  ]
})


export class Forms42Main implements OnInit
{
	private page:HTMLDivElement = null;
	private modal:HTMLDivElement = null;

	@ViewChild("page",{read: ElementRef, static: true}) private pelem:ElementRef;
	@ViewChild("modal",{read: ElementRef, static: true}) private melem:ElementRef;


	constructor(builder:Builder)
	{
		Forms42App.main = this;
		Components.builder = builder;
	}


	public ngOnInit(): void 
	{
		this.page = this.pelem.nativeElement;
		this.modal = this.melem.nativeElement;
	}


	public showComponent(id:string, inst:string) : void
	{
		let cinst:ComponentInstance = Components.getInstance(id,inst);
		this.page.appendChild(cinst.node());
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