import { Action } from "./Action";

//Myexe.exe --drink Beer --food Chicken
//FireAnd forget
export class CallAnExecutableFireAndForget implements Action {
    protected parameters : string[]

    constructor(protected executablePath: string, parameters: { [key: string]: string }) { 
        this.parameters = this.prepareParameters(parameters)
    }

    execute(): Promise<{ [key: string]: string; }> {
        var exec = require('child_process').execFile;

        //Waiting the completition before returning
        return new Promise((resolve, reject) => {
            exec(this.executablePath, this.parameters, (err, data) =>{
                 console.log("done")
                 resolve({ 'CallAnExecutable': 'Completed' })
            })
        })



        /* fire and forget (split)
        exec(this.executablePath, this.parameters, (err, data) => console.log("done"))//function (err, data) {  })
        return new Promise((resolve, reject) => {resolve({ 'CallAnExecutable': 'Completed' })})   */
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