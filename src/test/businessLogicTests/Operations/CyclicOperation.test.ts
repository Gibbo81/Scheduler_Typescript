import { CyclicOperation } from "../../../businessLogic/Operations/CyclicOperation";
import { OperationStatus } from "../../../businessLogic/plugIn/OperationStatus";
import { IsToExecute } from "../../../businessLogic/IsToExecute";
import { Action } from "../../../businessLogic/Actions/Action";


test('Operation never executed before, executes its actions and return true', async ()=> {
    var mock = new OperationStatusMock(undefined)    
    var actions :Action[] = []
    actions.push(new ActionMock())
    actions.push(new ActionMock())
    var operation = new CyclicOperation(10, "Pippus", 777, mock, actions)

    var result = await operation.CheckAndExecute();

    expect(result).toBeTruthy()
})


class ActionMock implements Action{
    public executed: boolean= false

    execute(): Promise<{ [key: string]: string; }> {
        this.executed = true
        return Promise.resolve({})
    }
}

class OperationStatusMock implements OperationStatus{
    constructor(private result : IsToExecute|undefined){}
    public name : string|undefined= undefined

    read(name: string): Promise<IsToExecute | undefined> {
        this.name = name
        return Promise.resolve(this.result)
    }
}

class IsToExecuteMock implements IsToExecute{
    
    constructor(private checkResult: boolean){}
    public interval : number|undefined= undefined
    public ownerIdCompleted : string|undefined= undefined
    public ownerIdStarted : string|undefined= undefined

    check(interval: number): boolean {
        return this.checkResult;
    }
    complete(ownerId: string): Promise<void> {
        return Promise.resolve()
    }
    start(ownerId: string): Promise<void> {
        return Promise.resolve()
    }
}