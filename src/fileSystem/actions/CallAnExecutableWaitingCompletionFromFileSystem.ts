import { CallAnExecutableWaitingCompletion } from "../../businessLogic/Actions/CallAnExecutableWaitingCompletion";

export class CallAnExecutableWaitingCompletionFromFileSystem extends CallAnExecutableWaitingCompletion{
    constructor(executablePath: string, parameters: { [key: string]: string }){
        super(executablePath, parameters)
    }    
    
    protected lunchAndWait(): Promise<void> {
        return new Promise((resolve, reject) => {
            var exec = require('child_process').execFile;
            exec(this.executablePath, this.parameters,
                (err, data) => {
                    if (err)
                        reject();
                    resolve();
                });
        });
    }
}