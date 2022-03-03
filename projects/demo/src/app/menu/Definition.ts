export interface Menu
{
    name:string;
    classes:string,
    action(cmd?:string) : void;
    toggle(path?:string) : string;
}

export interface MenuEntry
{
    name:string;
    active:boolean;
    command?:string;
    entries?:MenuEntry[];
}