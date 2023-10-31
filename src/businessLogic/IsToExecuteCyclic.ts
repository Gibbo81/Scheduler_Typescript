import { IsToExecute } from "./IsToExecute";
import { CloseStartOperation } from "./plugIn/CloseOperation";

abstract class OnlyClose{
    constructor (protected name: string, 
                 protected operation : CloseStartOperation){}

    async complete(): Promise<void> {
        await this.operation.close(this.name, new Date());
    }
}

export class IsToExecuteCyclic extends OnlyClose implements IsToExecute{
    constructor (name: string, 
                 private lastExecution: Date, 
                 private inExecution : boolean, 
                 private schedulerId : number, 
                 operation : CloseStartOperation){
                    super(name, operation)
                 }
    
    check(interval: number): boolean {
        var nextExecutionTime = new Date(this.lastExecution.getTime() + interval*60000)
        if (this.inExecution === false && new Date() > nextExecutionTime)            
            return true
        return false
    }

    async start(): Promise<boolean> {
        return await this.operation.start(this.name, new Date(), this.schedulerId );
    }
}

export class IsToExecuteFirstTime extends OnlyClose  implements IsToExecute{
    constructor (name: string, 
                 private schedulerId : number, 
                 operation : CloseStartOperation){
                    super(name, operation)
                 }
    
    check(interval: number): boolean {return true}

    async start(): Promise<boolean> {
        await this.operation.create(this.name, new Date(), this.schedulerId)
        return true
    }
}