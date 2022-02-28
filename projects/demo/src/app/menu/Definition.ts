export interface Menu
{
    name:string;
    classes:string,
    show(path?:string) : string;
}

export interface MenuEntry
{
    name:string;
    command?:string;
    entries?:MenuEntry[];
}