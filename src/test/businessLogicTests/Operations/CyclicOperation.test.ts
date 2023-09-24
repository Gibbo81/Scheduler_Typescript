import { CyclicOperation } from "../../../businessLogic/Operations/CyclicOperation";
import { OperationStatus } from "../../../businessLogic/plugIn/OperationStatus";
import { IsToExecute } from "../../../businessLogic/IsToExecute";
import { Action } from "../../../businessLogic/Actions/Action";


test('Must execute the operation, executes its actions and return true', async ()=> {
    var status = new IsToExecuteMock(true)
    var statusReaderMock = new OperationStatusMock(status)    
    var actions :ActionMock[] = []
    actions.push(new ActionMock())
    actions.push(new ActionMock())
    var cycliTime =10
    var operationName ="Pippus"
    var operation = new CyclicOperation(cycliTime, operationName, 777, statusReaderMock, actions)

    var result = await operation.CheckAndExecute();

    expect(result).toBeTruthy()
    expect(actions[0].executed).toBeTruthy()
    expect(actions[1].executed).toBeTruthy()
    expect(status.interval).toBe(cycliTime)
    expect(status.completed).toBeTruthy()
    expect(status.started).toBeTruthy()
    expect(statusReaderMock.name).toBe(operationName)
})

test('Must NOT execute the operation, do not executes its actions and return false', async ()=> {
    var status = new IsToExecuteMock(false)
    var statusReaderMock = new OperationStatusMock(status)    
    var actions :ActionMock[] = []
    actions.push(new ActionMock())
    actions.push(new ActionMock())
    var cycliTime =10
    var operationName ="Pippus"
    var operation = new CyclicOperation(cycliTime, operationName, 777, statusReaderMock, actions)

    var result = await operation.CheckAndExecute();

    expect(result).toBeFalsy()
    expect(actions[0].executed).toBeFalsy()
    expect(actions[1].executed).toBeFalsy()
    expect(status.interval).toBe(cycliTime)
    expect(status.completed).toBeFalsy()
    expect(status.started).toBeFalsy()
    expect(statusReaderMock.name).toBe(operationName)
})


class ActionMock implements Action{
    public executed: boolean= false

    execute(): Promise<{ [key: string]: string; }> {
        this.executed = true
        return Promise.resolve({})
    }
}

class OperationStatusMock implements OperationStatus{
    constructor(private result : IsToExecute){}
    public name : string|undefined= undefined

    read(name: string): Promise<IsToExecute> {
        this.name = name
        return Promise.resolve(this.result)
    }
}

class IsToExecuteMock implements IsToExecute{
    
    constructor(private checkResult: boolean){}
    public interval : number|undefined= undefined
    public completed : boolean|undefined= undefined
    public started : boolean|undefined= undefined

    check(interval: number): boolean {
        this.interval= interval
        return this.checkResult
    }
    complete(): Promise<void> {
        this.completed = true
        return Promise.resolve()
    }
    start(): Promise<void> {
        this.started = true
        return Promise.resolve()
    }
}