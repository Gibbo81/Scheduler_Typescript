import { Action } from "./Action";
import { CallAnExecutableBase } from "./CallAnExecutableBase";

export abstract class CallAnExecutableWaitingCompletion extends CallAnExecutableBase implements Action {
    protected abstract lunchAndWait(): Promise<void> 

    constructor(executablePath: string, parameters: { [key: string]: string }) { 
        super(executablePath, parameters)
    }

    async execute(): Promise<{ [key: string]: string; }> {
        try{
            return await this.tryExecute();   
        }
        catch(e) {
            return{ 'Name': 'CallAnExecutable', 'Status': 'Failure' }   
        }
    }

    async tryExecute(): Promise<{ [key: string]: string; }> {
        await this.lunchAndWait()
        return { 'Name': 'CallAnExecutable', 'Status': 'Completed' }
    }
}