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
            active: true,
            entries:
            [
                {
                    name: "Jylland",
                    active: true,
                    entries:
                    [
                        {
                            name: "Sønderborg",
                            active: true,
                            command: "/soenderborg"
                        }
                        ,
                        {
                            name: "Århus",
                            active: true,
                            entries:
                            [
                                {
                                    name: "Syd",
                                    active: true,
                                    command: "/aahus/syd"
                                }
                                ,
                                {
                                    name: "Nord",
                                    active: true,
                                    command: "/aahus/nord"
                                }
                            ]
                        }
                        ,
                        {
                            name: "Skagen",
                            active: true,
                            command: "/skagen"
                        }
                    ]
                }
                ,
                {
                    name: "Sjælland",
                    active: true,
                    entries:
                    [
                        {
                            name: "København",
                            active: true,
                            command: "/kopenhavn"
                        }
                        ,
                        {
                            name: "Hørsholm",
                            active: true,
                            command: "/horsholm"
                        }
                    ]
                }
                ,
                {
                    name: "Fyn",
                    active: true,
                    command: "/fyn"
                }
                ,
                {
                    name: "Øerne",
                    active: true,
                    command: "/oerne"
                }
            ]
        });
    }
}