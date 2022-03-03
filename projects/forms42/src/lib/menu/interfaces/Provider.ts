import { MenuEntry } from "./MenuEntry";

export interface Provider
{
    root() : MenuEntry;
    execute(action:string) : boolean;
    entries(path:number[]) : MenuEntry[];
}