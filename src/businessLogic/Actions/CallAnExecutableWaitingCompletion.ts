import { Action } from "./Action";

//Myexe.exe --drink Beer --food Chicken
//FireAnd forget
export class CallAnExecutableWaitingCompletion implements Action {
    protected parameters : string[]

    constructor(protected executablePath: string, parameters: { [key: string]: string }) { 
        this.parameters = this.prepareParameters(parameters)
    }

    execute(): Promise<{ [key: string]: string; }> {
        return new Promise((resolve, reject) => {
            var exec = require('child_process').execFile;
            exec(this.executablePath, 
                this.parameters, 
                (err, data) =>{
                    if (err)
                        reject()
                    resolve({ 'CallAnExecutable': 'Completed' })
                })
        })
    }

    private prepareParameters(parameters: { [key: string]: string }): string[] {
        var result: string[] = []
        for (var key in parameters) 
            this.AddCouple(result, key, parameters)        
        return result
    }

    private AddCouple(result: string[], key: string, parameters: { [key: string]: string }) {
        result.push('--' + key);
        result.push(parameters[key]);
    }
}