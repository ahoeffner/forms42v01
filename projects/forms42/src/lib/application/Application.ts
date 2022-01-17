import { Component, AfterViewInit } from "@angular/core";

@Component({
  selector: 'application',
  template: `<fragment name="forms"></fragment>`
})


export class FormApplication implements AfterViewInit
{
    public ngAfterViewInit(): void 
    {
        throw new Error("Method not implemented.");
    }
}