export interface FieldInstance
{
    id:string;
    row:string;    
    size:string; 
    name:string; 
    type:string; 
    block:string;
    group:string;
    class:string;
    style:string;
    value:string;

    placeholder() : HTMLElement;
    implementation() : HTMLElement;
}