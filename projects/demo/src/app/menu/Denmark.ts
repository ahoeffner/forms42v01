import { StaticMenuEntry, StaticMenuProvider, register } from 'forms42';

@register()

export class Denmark extends StaticMenuProvider
{
    data: StaticMenuEntry = this.test();

    execute(action: string): boolean
    {
        console.log("click: "+action);
        return(true);
    }

    private test() : StaticMenuEntry
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