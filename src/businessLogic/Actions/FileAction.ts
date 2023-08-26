import { Action } from "./Action";
import { IsToExecute } from "../IsToExecute";

//TODO: working on this action

export class FileAction implements Action{
    
    
    execute(): Promise<{ [key: string]: string; }> {
        throw new Error("Method not implemented.");
    }

}