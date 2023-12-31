import { Action } from "./Action";
import { CallAnExecutableBase } from "./CallAnExecutableBase";

export abstract class CallAnExecutableFireAndForget extends CallAnExecutableBase implements Action {    
    protected abstract lunch():void;

    constructor(executablePath: string, parameters: { [key: string]: string }) { 
        super(executablePath, parameters)
    }

    execute(): Promise<{ [key: string]: string; }> {
        try{
            return this.tryExecute();   
        }
        catch(e) {
            return new Promise((resolve, reject) => {resolve({ 'Name': 'CallAnExecutable', 'Status': 'Failure' })})   
        }
    }

    private tryExecute() : Promise<{ [key: string]: string; }> {
        this.lunch();
        return new Promise((resolve, reject) => { resolve({ 'Name': 'CallAnExecutable', 'Status': 'Completed' }); });
    }
}