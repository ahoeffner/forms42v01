import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { Forms42 } from './application/Forms42';


@NgModule({
    declarations: [Forms42],
    exports     : [Forms42],
    imports     : [CommonModule, HttpClientModule]
})


export class Forms42Module
{
}