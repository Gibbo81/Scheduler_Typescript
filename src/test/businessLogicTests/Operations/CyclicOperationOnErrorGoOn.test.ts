import { OperationStatus } from "../../../businessLogic/plugIn/OperationStatus";
import { IsToExecute } from "../../../businessLogic/IsToExecute";
import { Action } from "../../../businessLogic/Actions/Action";
import { CyclicOperationOnErrorGoOn } from "../../../businessLogic/Operations/CyclicOperationOnErrorGoOn";

test('Must execute the operation, executes ALL its actions even if one goes in error and returns true', async ()=> {
    var status = new IsToExecuteMock(true, true)
    var statusReaderMock = new OperationStatusMock(status)    
    var actions :ActionMock[] = []
    actions.push(new ActionMock())
    actions.push(new ActionMockThrowException())
    actions.push(new ActionMockError())
    actions.push(new ActionMock())
    var cycliTime =10
    var operationName ="Pippus"
    var operation = new CyclicOperationOnErrorGoOn(cycliTime, operationName, statusReaderMock, actions)

    var result = await operation.CheckAndExecute();

    expect(result).toBeTruthy()
    expect(actions[0].executed).toBeTruthy()
    expect(actions[1].executed).toBeTruthy()
    expect(actions[2].executed).toBeTruthy()
    expect(actions[3].executed).toBeTruthy()
    expect(status.interval).toBe(cycliTime)
    expect(status.completed).toBeTruthy()
    expect(status.started).toBeTruthy()
    expect(statusReaderMock.name).toBe(operationName)
})


test('Must execute the operation, executes its actions and returns true', async ()=> {
    var status = new IsToExecuteMock(true, true)
    var statusReaderMock = new OperationStatusMock(status)    
    var actions :ActionMock[] = []
    actions.push(new ActionMock())
    actions.push(new ActionMock())
    var cycliTime =10
    var operationName ="Pippus"
    var operation = new CyclicOperationOnErrorGoOn(cycliTime, operationName, statusReaderMock, actions)

    var result = await operation.CheckAndExecute();

    expect(result).toBeTruthy()
    expect(actions[0].executed).toBeTruthy()
    expect(actions[1].executed).toBeTruthy()
    expect(status.interval).toBe(cycliTime)
    expect(status.completed).toBeTruthy()
    expect(status.started).toBeTruthy()
    expect(statusReaderMock.name).toBe(operationName)
})

test("Must execute the operation but another instance takes charge of it instead, doesn't execute its actions and returns false", async ()=> {
    var operationNotForMe = false
    var status = new IsToExecuteMock(true, operationNotForMe)
    var statusReaderMock = new OperationStatusMock(status)    
    var actions :ActionMock[] = []
    actions.push(new ActionMock())
    actions.push(new ActionMock())
    var cycliTime =10
    var operationName ="Pippus"
    var operation = new CyclicOperationOnErrorGoOn(cycliTime, operationName, statusReaderMock, actions)

    var result = await operation.CheckAndExecute();

    expect(result).toBeFalsy()
    expect(actions[0].executed).toBeFalsy()
    expect(actions[1].executed).toBeFalsy()
    expect(status.interval).toBe(cycliTime)
    expect(status.completed).toBeFalsy()
    expect(status.started).toBeTruthy()
    expect(statusReaderMock.name).toBe(operationName)
})

test('Must NOT execute the operation, does not executes it actions and returns false', async ()=> {
    var status = new IsToExecuteMock(false, true)
    var statusReaderMock = new OperationStatusMock(status)    
    var actions :ActionMock[] = []
    actions.push(new ActionMock())
    actions.push(new ActionMock())
    var cycliTime =10
    var operationName ="Pippus"
    var operation = new CyclicOperationOnErrorGoOn(cycliTime, operationName, statusReaderMock, actions)

    var result = await operation.CheckAndExecute();

    expect(result).toBeFalsy()
    expect(actions[0].executed).toBeFalsy()
    expect(actions[1].executed).toBeFalsy()
    expect(status.interval).toBe(cycliTime)
    expect(status.completed).toBeFalsy()
    expect(status.started).toBeFalsy()
    expect(statusReaderMock.name).toBe(operationName)
})


export class ActionMock implements Action{
    public executed: boolean= false

    execute(): Promise<{ [key: string]: string; }> {
        this.executed = true
        return Promise.resolve({ 'Name': 'ActionMock', 'Status': 'Completed' })
    }
}

export class ActionMockError extends ActionMock implements Action{
    execute(): Promise<{ [key: string]: string; }> {
        this.executed = true
        return Promise.resolve({ 'Name': 'ActionMock', 'Status': 'Failure' })
    }
}

export class ActionMockThrowException extends ActionMock  implements Action{
    execute(): Promise<{ [key: string]: string; }> {
        this.executed = true
        throw new Error(":-(")
    }
}


export class OperationStatusMock implements OperationStatus{
    constructor(private result : IsToExecute){}
    public name : string|undefined= undefined

    read(name: string): Promise<IsToExecute> {
        this.name = name
        return Promise.resolve(this.result)
    }
}

export class IsToExecuteMock implements IsToExecute{    
    constructor(private checkResult: boolean, private wasAbleToTakeChargeOfTheOperation: boolean){}
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
    start(): Promise<boolean> {
        this.started = true
        return Promise.resolve(this.wasAbleToTakeChargeOfTheOperation)
    }
}