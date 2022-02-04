import { Builder } from './Builder';
import { F42Component } from '../application/F42Component';
import { F42ComponentFactory as ComponentFactory } from '../interfaces/F42ComponentFactory';


export class F42ComponentFactory implements ComponentFactory
{
    public static builder:Builder = null;
  
    getComponent(id: string, inst: string): F42Component 
    {
        return(null);
    }
}