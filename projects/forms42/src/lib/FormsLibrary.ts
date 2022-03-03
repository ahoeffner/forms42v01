import { NGMain } from './angular/NGMain';
import { Builder } from './angular/Builder';
import { Context } from './application/Context';
import { ComponentFactory } from './application/ComponentFactory';
/*
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 3 only, as
 * published by the Free Software Foundation.

 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 */

import { NgModule } from '@angular/core';
import { NGMenu } from './angular/NGMenu';
import { NGField } from './angular/NGField';


@NgModule({
	imports: [],
	declarations: 	[NGMain, NGMenu, NGField],
	exports: 		[NGMain, NGMenu, NGField]
})


export class FormsLibrary
{
	constructor()
	{
		console.log("Forms42 Version 2.0");
	}
}