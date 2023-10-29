import { Action } from "../Actions/Action";
import { OperationStatus } from "../plugIn/OperationStatus";
import { IOperation } from "./IOperation";
import { IsToExecute } from "../IsToExecute";

export class CyclicOperation implements IOperation{
    constructor(private cyclicTime : number,  
                private name : string,
                private ownerId: number,
                private status: OperationStatus, 
                private actions: Action[]){}
    
    async CheckAndExecute(): Promise<boolean> {        
        var currentStatus = await this.status.read(this.name);               
        if (currentStatus.check(this.cyclicTime))
            return await this.ExecuteActions(currentStatus)
        return false
    }

    private async ExecuteActions(currentStatus: IsToExecute) : Promise<boolean>{
        var isTakenInChargeByThisInstance = await currentStatus.start()
        if (!isTakenInChargeByThisInstance)
            return false;
        await this.executeActions();
        await currentStatus.complete()
        return true;
    }

    private async executeActions() {
        for (const x of this.actions)
            await x.execute();
    }
}