import { IsToExecute } from "./IsToExecute";
import { CloseOperation } from "./plugIn/CloseOperation";


export class IsToExecuteCyclic implements IsToExecute{
    constructor (private name: string, 
                 private lastExecution: Date, 
                 private inExecution : boolean, 
                 private status : CloseOperation){}
    
    check(interval: number): boolean {
        var nextExecutionTime = new Date(this.lastExecution.getTime() + interval*60000)
        if (this.inExecution === false && new Date() > nextExecutionTime)            
            return true
        return false
    }

    start(ownerId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    complete(ownerId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}