import { Form } from '../forms/Form';
import { Context } from '../application/Context';
import { NGComponentFactory } from './NGComponentFactory';
import { Form as IForm } from '../framework/interfaces/Form';
import { Component, AfterViewInit, OnInit } from "@angular/core";

@Component({template: ''})


export class NGForm extends Form implements IForm, OnInit, AfterViewInit
{
    public ngOnInit(): void 
    {
        this["fw"] = this;
        (Context.factory.factory() as NGComponentFactory).form = this;
    }


    public ngAfterViewInit(): void 
    {
        this.test();
    }
}