import { ComponentInstance } from "./Components";

export class Forms42Window
{
	private layer:number = 0;
	private page:HTMLDivElement = null;
	private modal:HTMLDivElement = null;
	private canvas:HTMLDivElement = null;

	private html:string = 
	`
	<style>
		.canvas
		{
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

	</style>

	<div class="canvas">
		<div id=page class="page">Page</div>
		<div id=modal class="page modal">Modal</div>
	</div>
	`;


    constructor()
    {
		let node:HTMLDivElement = document.createElement('div');
		node.innerHTML = this.html;

		this.page = node.getElementsByClassName("page")[0] as HTMLDivElement;
		this.modal = node.getElementsByClassName("page")[1] as HTMLDivElement;
		this.canvas = node.getElementsByClassName("canvas")[0] as HTMLDivElement;
	}


	public node() : HTMLDivElement
	{
		return(this.canvas);
	}


	public setLayer(layer:number) : void
	{
		this.layer = layer;
		this.page.style.zIndex = "" + this.layer;
		this.modal.style.zIndex = "" + (+this.layer + 1);
	}


	public showComponent(cinst:ComponentInstance, layer:number) : ComponentInstance
	{
		this.setLayer(layer);
		this.page.appendChild(cinst.node());
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