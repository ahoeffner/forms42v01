import { Main } from '../framework/interfaces/Main';
import { ComponentFactory } from "../framework/ComponentFactory";

export class Context
{
    public static main:Main = null;
    public static factory:ComponentFactory = new ComponentFactory();
}