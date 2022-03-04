import { Provider } from "./interfaces/Provider";
import { EventFilter } from "../events/EventFilters";
import { EventListener } from "../events/EventListener";
import { MenuEntry, StaticMenuEntry } from "./interfaces/MenuEntry";


export abstract class StaticMenuProvider implements Provider, EventListener
{
    abstract data:StaticMenuEntry;
    private menu:Map<string,StaticMenuEntry>;

    public root(): MenuEntry
    {
        return(this.data);
    }

    public entries(path:string): MenuEntry[]
    {
        let entry:StaticMenuEntry = this.find(path);
        if (entry != null) return(entry.entries);
        return([]);
    }

    public find(path:string) : StaticMenuEntry
    {
        if (path.length > 1 && path.endsWith("/"))
            path = path.substring(0,path.length-1);

        return(this.menu.get(path));
    }

    public enable(path:string,flag:boolean) : void
    {
        let entry:StaticMenuEntry = this.find(path);
        if (entry != null) entry.active = flag;
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