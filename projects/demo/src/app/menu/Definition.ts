export interface Menu
{
    name:string;
    show(path?:string) : string;
}

export interface MenuEntry
{
    id:number;
    name:string;
    content:MenuEntry[]|string;
}