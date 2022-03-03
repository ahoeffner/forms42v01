import { Provider } from "./interfaces/Provider";
import { EventFilter } from "../events/EventFilters";
import { EventListener } from "../events/EventListener";
import { MenuEntry, StaticMenuEntry } from "./interfaces/MenuEntry";


export abstract class StaticMenuProvider implements Provider, EventListener
{
    public data:StaticMenuEntry = null;

    public root(): MenuEntry
    {
        throw new Error("Method not implemented.");
    }

    public entries(path: string): MenuEntry[]
    {
        throw new Error("Method not implemented.");
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