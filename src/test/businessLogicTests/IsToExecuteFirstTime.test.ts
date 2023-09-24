import { IsToExecuteFirstTime } from "../../businessLogic/IsToExecuteCyclic"
import { mockCloseOperation } from "./IsToExecuteCyclic.test"


test('A new operation must ALWAYS be executed "returns true"', () =>{    
    var cyclicTime= 10
    var currentDate =new Date()
    var lastExecutionDate= new Date(currentDate.getTime() - (cyclicTime+1)*60000)
    var checker = new IsToExecuteFirstTime('pippo', 12, new mockCloseOperation())    

    var result = checker.check(cyclicTime)

    expect(result).toBeTruthy()
  }
)

test('To complete the operation execution call the correct method', async () =>{
    var mock = new mockCloseOperation()
    var checker = new IsToExecuteFirstTime('pippo', 12, mock)    

    await checker.complete()

    expect(mock.closed).toBeTruthy()
})

test('To start the operation execution call the correct method', async () =>{
    var mock = new mockCloseOperation()
    var checker = new IsToExecuteFirstTime('pippo', 12, mock)    

    await checker.start()

    expect(mock.created).toBeTruthy()
})