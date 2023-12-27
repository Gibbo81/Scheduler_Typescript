import { Action } from "../Actions/Action";
import { OperationStatus } from "../plugIn/OperationStatus";
import { CyclicOperationBase } from "./CyclicOperation";

export class CyclicOperationOnErrorGoOn extends CyclicOperationBase{
    constructor(cyclicTime : number,  
                name : string,
                status: OperationStatus, 
                actions: Action[]){ super(cyclicTime, name, status, actions)}

                
    protected async executeActions(): Promise<number> {
        var errorsNumber = 0;
        for (const x of this.actions)
             errorsNumber = errorsNumber + await this.tryExecuteActions(x);
        return errorsNumber
    }
}