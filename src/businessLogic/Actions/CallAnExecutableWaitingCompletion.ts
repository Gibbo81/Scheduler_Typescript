import { Action } from "./Action";
import { CallAnExecutableBase } from "./CallAnExecutableBase";

export abstract class CallAnExecutableWaitingCompletion extends CallAnExecutableBase implements Action {
    protected abstract lunchAndWait(): Promise<void> 

    constructor(executablePath: string, parameters: { [key: string]: string }) { 
        super(executablePath, parameters)
    }

    async execute(): Promise<{ [key: string]: string; }> {
        await this.lunchAndWait()
        return { 'CallAnExecutable': 'Completed' }
    }
}