import { Action } from "../Actions/Action";
import { OperationStatus } from "../plugIn/OperationStatus";
import { IOperation } from "./IOperation";
import { IsToExecute } from "../IsToExecute";

export abstract class CyclicOperationBase implements IOperation{
    private readonly executed = true;
    private readonly notExeceuted = false;
    protected readonly noError : number = 0;
    protected readonly error : number = 1;
    protected readonly success : string = 'Completed';

    constructor(private cyclicTime : number,  
                private name : string,
                private status: OperationStatus, 
                protected actions: Action[]){}
    
    protected abstract executeActions(): Promise<number>

    async CheckAndExecute(): Promise<boolean> {        
        var currentStatus = await this.status.read(this.name);               
        if (currentStatus.check(this.cyclicTime))
            return await this.executeOperation(currentStatus)
        return false
    }

    private async executeOperation(currentStatus: IsToExecute) : Promise<boolean>{
        var isTakenInChargeByThisInstance = await currentStatus.start()
        if (!isTakenInChargeByThisInstance)
            return this.notExeceuted;
        await this.executeActions();
        await currentStatus.complete()
        return this.executed;
    }

    protected async tryExecuteActions(x: Action): Promise<number> {
        try {
            return await this.checkResult(x);
        }
        catch{
            return this.error
        }
    }

    private async checkResult(x: Action) {
        var result = await x.execute();
        return result.Status === this.success ? this.noError : this.error;
    }
}