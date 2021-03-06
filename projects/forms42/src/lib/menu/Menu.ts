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

import { MenuPrivate } from "./MenuPrivate";

export class Menu
{
    private __priv__:MenuPrivate = null;

    constructor()
    {
        this.__priv__ = new MenuPrivate(this);
    }

    public open() : void
    {
        this.__priv__.open();
    }

    public close() : void
    {
        this.__priv__.close();
    }
}