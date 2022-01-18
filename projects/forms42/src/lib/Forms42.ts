import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { Application } from './application/Application';


@NgModule({
    declarations: [Application],
    exports     : [Application],
    imports     : [CommonModule, HttpClientModule]
})


export class Forms42
{
}