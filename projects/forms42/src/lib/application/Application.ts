import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";

@Component({
  selector: 'alex',
  template: 
  `Library III
        <span #canvas style="z-index=0">
          <span #page  style="z-index=1"><input></span>
        </span>
  `
})


export class Application implements OnInit
{
  page:HTMLElement = null;
  canvas:HTMLElement = null;
  
  @ViewChild("page",{read: ElementRef, static: true}) pelem:ElementRef;
  @ViewChild("canvas",{read: ElementRef, static: true}) celem:ElementRef;

  public ngOnInit(): void 
  {
      console.log("init");
      this.page = this.pelem.nativeElement;
      this.canvas = this.celem.nativeElement;
  }


  public block() : void
  {
    this.page.style.zIndex = "1";
    this.canvas.style.zIndex = "0";
  }


  public unblock() : void
  {
    this.page.style.zIndex = "0";
    this.canvas.style.zIndex = "1";    
  }
}