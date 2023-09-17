import { IsToExecuteCyclic } from "../../businessLogic/IsToExecuteCyclic"
import { CloseOperation } from "../../businessLogic/plugIn/CloseOperation"


test('Operation is not in execution and its last execution is older of "cyclicTime" so must be executed "returns true"', () =>{    
    var cyclicTime= 10
    var currentDate =new Date()
    var lastExecutionDate= new Date(currentDate.getTime() - (cyclicTime+1)*60000)
    var checker = new IsToExecuteCyclic('pippo', lastExecutionDate, false, new mockCloseOperation())    

    var result = checker.check(cyclicTime)

    expect(result).toBeTruthy()
  }
)

test('Operation is not in execution but its last execution is NOT older of "cyclicTime" so must NOT be executed "returns false"', () =>{    
    var cyclicTime= 10
    var currentDate =new Date()
    var lastExecutionDate= new Date(currentDate.getTime() - (cyclicTime-1)*60000)
    var checker = new IsToExecuteCyclic('pippo', lastExecutionDate, false, new mockCloseOperation())    

    var result = checker.check(cyclicTime)

    expect(result).toBeFalsy
  }
)

test('Operation is already in execution  so must NOT be executed "returns false"', () =>{    
    var cyclicTime= 0
    var checker = new IsToExecuteCyclic('pippo', new Date(), true, new mockCloseOperation())    

    var result = checker.check(cyclicTime)

    expect(result).toBeFalsy()
  }
)

class mockCloseOperation implements CloseOperation{
    close(operationName: string): Promise<void> {
        return new Promise((resolve, reject) => {resolve()})
    }
    Start(operationName: string, date: Date, schedulerId: number): Promise<void> {
        return new Promise((resolve, reject) => {resolve()})
    }
}
