import { CallAnExecutableFireAndForget } from "../../businessLogic/Actions/CallAnExecutableFireAndForget";

export class CallAnExecutableFireAndForgetFromFileSystem extends CallAnExecutableFireAndForget{
    constructor(executablePath: string, parameters: { [key: string]: string }){
        super(executablePath, parameters)
    }    
    
    protected lunch(): void {
        var exec = require('child_process').execFile
        exec(this.executablePath, this.parameters)           
    }    
}