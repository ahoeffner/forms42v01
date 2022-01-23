export class Sleeper
{
    public sleep(ms:number) : Promise<void>
    {
        return(new Promise(resolve => setTimeout(resolve,ms)));
    }
}