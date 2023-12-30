import { CyclicOperationOnErrorStop } from "../../../businessLogic/Operations/CyclicOperationOnErrorStop";
import { ActionMock, ActionMockError, ActionMockThrowException, IsToExecuteMock, OperationStatusMock } from "./CyclicOperationOnErrorGoOn.test";

test('Must execute the operation, executes its actions untill the first error and returns true', async ()=> {
    var status = new IsToExecuteMock(true, true)
    var statusReaderMock = new OperationStatusMock(status)    
    var actions :ActionMock[] = []
    actions.push(new ActionMock())
    actions.push(new ActionMock())
    actions.push(new ActionMockThrowException())
    actions.push(new ActionMockError())
    actions.push(new ActionMock())
    var cycliTime =10
    var operationName ="Pippus"
    var operation = new CyclicOperationOnErrorStop(cycliTime, operationName, statusReaderMock, actions)

    var result = await operation.CheckAndExecute();

    expect(result).toBeTruthy()
    expect(actions[0].executed).toBeTruthy()
    expect(actions[1].executed).toBeTruthy()
    expect(actions[2].executed).toBeTruthy()
    expect(actions[3].executed).toBeFalsy()
    expect(actions[4].executed).toBeFalsy()
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
    var operation = new CyclicOperationOnErrorStop(cycliTime, operationName, statusReaderMock, actions)

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
    var operation = new CyclicOperationOnErrorStop(cycliTime, operationName, statusReaderMock, actions)

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
    var operation = new CyclicOperationOnErrorStop(cycliTime, operationName, statusReaderMock, actions)

    var result = await operation.CheckAndExecute();

    expect(result).toBeFalsy()
    expect(actions[0].executed).toBeFalsy()
    expect(actions[1].executed).toBeFalsy()
    expect(status.interval).toBe(cycliTime)
    expect(status.completed).toBeFalsy()
    expect(status.started).toBeFalsy()
    expect(statusReaderMock.name).toBe(operationName)
})