import { Component, AfterViewInit, OnInit } from "@angular/core";

@Component({template: ''})


export class NGForm implements OnInit, AfterViewInit
{
    public ngOnInit(): void 
    {
        console.log("OnInit");
    }


    public ngAfterViewInit(): void 
    {
        console.log("AfterViewInit");
    }
}