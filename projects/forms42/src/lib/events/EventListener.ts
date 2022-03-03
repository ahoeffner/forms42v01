import { EventFilter } from "./EventFilters";

export interface EventListener
{
    fiters?() : EventFilter|EventFilter[];
    onEvent(events:Event|Event[]) : boolean;
}