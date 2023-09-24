import { IsToExecuteCyclic } from "../../businessLogic/IsToExecuteCyclic"
import { CloseStartOperation } from "../../businessLogic/plugIn/CloseOperation"


test('Operation is not in execution and its last execution is older of "cyclicTime" so must be executed "returns true"', () =>{    
    var cyclicTime= 10
    var currentDate =new Date()
    var lastExecutionDate= new Date(currentDate.getTime() - (cyclicTime+1)*60000)
    var checker = new IsToExecuteCyclic('pippo', lastExecutionDate, false, 12, new mockCloseOperation())    

    var result = checker.check(cyclicTime)

    expect(result).toBeTruthy()
  }
)

test('Operation is not in execution but its last execution is NOT older of "cyclicTime" so must NOT be executed "returns false"', () =>{    
    var cyclicTime= 10
    var currentDate =new Date()
    var lastExecutionDate= new Date(currentDate.getTime() - (cyclicTime-1)*60000)
    var checker = new IsToExecuteCyclic('pippo', lastExecutionDate, false, 12, new mockCloseOperation())    

    var result = checker.check(cyclicTime)

    expect(result).toBeFalsy
  }
)

test('Operation is already in execution  so must NOT be executed "returns false"', () =>{    
    var cyclicTime= 0
    var checker = new IsToExecuteCyclic('pippo', new Date(), true, 12, new mockCloseOperation())    

    var result = checker.check(cyclicTime)

    expect(result).toBeFalsy()
  }
)

test('To complete the operation execution call the correct method', async () =>{
    var mock = new mockCloseOperation()
    var checker = new IsToExecuteCyclic('pippo', new Date(), true, 12, mock)    

    await checker.complete()

    expect(mock.closed).toBeTruthy()
})

test('To start the operation execution call the correct method', async () =>{
    var mock = new mockCloseOperation()
    var checker = new IsToExecuteCyclic('pippo', new Date(), true, 12, mock)    

    await checker.start()

    expect(mock.started).toBeTruthy()
})

export class mockCloseOperation implements CloseStartOperation{
    closed : boolean= false    
    started : boolean= false    
    created : boolean= false    

    Create(operationName: string, date: Date, schedulerId: number): Promise<void> {
        this.created= true
        return new Promise((resolve, reject) => {resolve()})
    }
    close(operationName: string): Promise<void> {
        this.closed= true
        return new Promise((resolve, reject) => {resolve()})
    }
    Start(operationName: string, date: Date, schedulerId: number): Promise<void> {
        this.started = true
        return new Promise((resolve, reject) => {resolve()})
    }
}
