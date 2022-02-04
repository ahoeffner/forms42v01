import { Component } from '../application/interfaces/Component';


export class NGComponent implements Component
{
    instance(): object 
    {
        throw new Error('Method not implemented.');
    }


    html(): HTMLElement 
    {
        throw new Error('Method not implemented.');
    }
}