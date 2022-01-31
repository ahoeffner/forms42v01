import { State } from "./State";
import { Builder } from "./Builder";
import { Forms42Window } from "./Forms42Window";
import { ComponentInstance, Components } from "./Components";
import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";


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
  styles: [
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


export class Forms42Main implements OnInit
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
		State.main = this;
		Components.builder = builder;
	}


	public ngOnInit(): void 
	{
		this.page = this.pelem.nativeElement;
		this.modal = this.melem.nativeElement;
		this.windows = this.welem.nativeElement;
		this.page.style.zIndex = "" + this.layer;
		this.modal.style.zIndex = "" + (+this.layer + 1);
	}


	public showComponent(id:string, inst:string) : ComponentInstance
	{
		let cinst:ComponentInstance = Components.getInstance(id,inst);
		this.page.appendChild(cinst.node());
		return(cinst);
	}


	public showWindow(id:string, inst:string, modal:boolean, layer:number) : ComponentInstance
	{
		let win:Forms42Window = new Forms42Window();
		let cinst:ComponentInstance = Components.getInstance(id,inst);

		win.showComponent(cinst,layer);
		this.windows.appendChild(win.node());

		return(cinst);
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