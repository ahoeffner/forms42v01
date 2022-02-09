export interface FieldInstance
{
    id:string;
    row:string;    
    name:string; 
    type:string; 
    block:string;
    group:string;
    class:string;
    style:string;

    placeholder() : HTMLElement;
    implementation() : HTMLElement;
}