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