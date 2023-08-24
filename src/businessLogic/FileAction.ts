import { Action } from "./Action";
import { IsToExecute } from "./plugIn/IsToExecute";

//TODO: working on this action

export class FileAction implements Action{
    constructor(private checker : IsToExecute, private name: string){}
    
    
    execute(): Promise<{ [key: string]: string; }> {
        throw new Error("Method not implemented.");
    }

}