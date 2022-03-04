export interface MenuEntry
{
    name:string;
    active:boolean;
    command?:string;
}


export interface StaticMenuEntry extends MenuEntry
{
    entries?:StaticMenuEntry[];
}