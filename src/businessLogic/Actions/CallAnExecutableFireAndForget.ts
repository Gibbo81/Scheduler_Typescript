import { Action } from "./Action";

export abstract class CallAnExecutableFireAndForget implements Action {
    protected parameters : string[]
    protected abstract lunch():void;

    constructor(protected executablePath: string, parameters: { [key: string]: string }) { 
        this.parameters = this.prepareParameters(parameters)
    }

    execute(): Promise<{ [key: string]: string; }> {
        this.lunch();
        return new Promise((resolve, reject) => {resolve({ 'CallAnExecutable': 'Completed' })})   
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