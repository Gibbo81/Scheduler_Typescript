import { Action } from "../Actions/Action";
import { OperationStatus } from "../plugIn/OperationStatus";
import { IOperation } from "./IOperation";
import { IsToExecute } from "../IsToExecute";

//TODO: working on this action
export class CyclicOperation implements IOperation{
    constructor(private cyclicTime : number,  
                private name : string,
                private ownerId: number,
                private status: OperationStatus, 
                private actions: Action[]){}
    
    async CheckAndExecute(): Promise<boolean> {        
        var status = await this.status.read(this.name);
        if (this.IsNeverExecutedBefore(status)) //TODO: bug red - test create new action before sytarting it
            return await this.ExecuteActions(status)                     
        if (status.check(this.cyclicTime))
            return await this.ExecuteActions(status)
        return false
    }

    private async ExecuteActions(status: IsToExecute) : Promise<boolean>{
        await status.start(this.ownerId.toString())
        for (const x of this.actions)
            await x.execute()
        await status.complete(this.ownerId.toString())
        return true;
    }

    private IsNeverExecutedBefore(x: IsToExecute | undefined) : boolean{
        return x === undefined;
    }
}