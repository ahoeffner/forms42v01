import { Provider } from "./interfaces/Provider";
import { EventFilter } from "../events/EventFilters";
import { EventListener } from "../events/EventListener";
import { MenuEntry, StaticMenuEntry } from "./interfaces/MenuEntry";


export abstract class StaticMenuProvider implements Provider, EventListener
{
    abstract data:StaticMenuEntry;

    public root(): MenuEntry
    {
        return(this.data);
    }

    public entries(path:number[]): MenuEntry[]
    {
        throw new Error("Method not implemented.");
    }

    public find(path:number[]) : StaticMenuEntry
    {
        return(null);
    }

    public findByName(path:string) : StaticMenuEntry
    {
        return(null);
    }

    public enable(entry:StaticMenuEntry,flag:boolean) : void
    {

    }

    abstract execute(action: string): boolean;

    public fiters?(): EventFilter | EventFilter[]
    {
        return(null);
    }

    public onEvent(events: Event | Event[]): boolean
    {
        return(true);
    }
}