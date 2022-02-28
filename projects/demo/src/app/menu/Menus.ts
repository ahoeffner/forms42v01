import { MenuEntry } from "./Definition";

export class Menus
{
    public static data:Map<string,MenuEntry> = Menus.init();

    private static init() : Map<string,MenuEntry>
    {
        let data:Map<string,MenuEntry> = new Map<string,MenuEntry>();
        data.set("test",Menus.test());
        return(data);
    }

    public static test() : MenuEntry
    {
        return(
        {
            name: "Danmark",
            entries:
            [
                {
                    name: "Jylland",
                    entries:
                    [
                        {
                            name: "Sønderborg",
                            command: "/soenderborg"
                        }
                        ,
                        {
                            name: "Århus",
                            entries:
                            [
                                {
                                    name: "Syd",
                                    command: "/aahus/syd"
                                }
                                ,
                                {
                                    name: "Nord",
                                    command: "/aahus/nord"
                                }
                            ]
                        }
                        ,
                        {
                            name: "Skagen",
                            command: "/skagen"
                        }
                    ]
                }
                ,
                {
                    name: "Sjælland",
                    entries:
                    [
                        {
                            name: "København",
                            command: "/kopenhavn"
                        }
                        ,
                        {
                            name: "Hørsholm",
                            command: "/horsholm"
                        }
                    ]
                }
                ,
                {
                    name: "Fyn",
                    command: "/fyn"
                }
                ,
                {
                    name: "Øerne",
                    command: "/oerne"
                }
            ]
        });
    }
}