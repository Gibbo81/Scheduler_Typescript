export abstract class CallAnExecutableBase {
    protected parameters : string[]

    constructor(protected executablePath: string, parameters: { [key: string]: string }) { 
        this.parameters = this.prepareParameters(parameters)
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