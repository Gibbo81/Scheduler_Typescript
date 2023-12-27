import { Action } from "../Actions/Action";
import { OperationStatus } from "../plugIn/OperationStatus";
import { CyclicOperationBase } from "./CyclicOperation";

export class CyclicOperationOnErrorStop extends CyclicOperationBase{
    constructor(cyclicTime : number,  
                name : string,
                status: OperationStatus, 
                actions: Action[]){ super(cyclicTime, name, status, actions)}

                
    protected async executeActions(): Promise<number> {
        for (const x of this.actions)            
            if ( await this.tryExecuteActions(x) === this.error)
                return this.error
        return this.noError
    }
}