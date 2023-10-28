import { ActionFactory } from "../../../businessLogic/Actions/ActionFactory";
import { CyclicOperationFactory } from "../../../businessLogic/Operations/CyclicOperationFactory";
import { CyclingConfiguratrion } from "../../../service/dto/CyclingConfiguratrion";

test("CyclicOperationFactory elaborates a configuration, there aren't errors, returns an operation", () =>{        
    var factory = new CyclicOperationFactory('con', 100, new ActionFactory())
    var configuration = new CyclingConfiguratrion()
    configuration.OperationName="deletefile"
    configuration.CyclingTime = 78
    configuration.Parallel = false
    configuration.Actions= [
        {name:"deletefile", folder:"C:/pppp/low", subNamePart:"oi"},
        {name:"deletefile", folder:"C:/pppp/high"}        
    ]

    var result = factory.build(configuration)

    expect(JSON.stringify(result)).toBe('{"cyclicTime":78,"name":"deletefile","ownerId":100,"status":{"db":"con","schedureId":100,"readCommand":"SELECT *\\nFROM OperationLastExecution\\nWHERE Name= $name","insertCommand":"INSERT INTO OperationLastExecution(\\n\\tName,\\n\\tLastExecution,\\n\\tInExecution,\\n\\tExecutionStarted,\\n\\tSchedulerInCharge)\\nVALUES ($name, $lastExecution, 1, $executionStarted, $scheduler)","startCommand":"UPDATE OperationLastExecution\\nSET InExecution = 1, ExecutionStarted = $startingTime, SchedulerInCharge = $scheduler\\nWHERE Name= $name"},"actions":[{"folder":"C:/pppp/low","subNamePart":"oi"},{"folder":"C:/pppp/high","subNamePart":null}]}')
})

test("CyclicOperationFactory elaborates a configuration but operation name is missing; returns an error", () =>{        
    var factory = new CyclicOperationFactory('con', 100, new ActionFactory())
    var configuration = new CyclingConfiguratrion()
    configuration.CyclingTime = 78
    configuration.Parallel = false
    configuration.Actions= [ {name:"deletefile", folder:"C:/pppp/low", subNamePart:"oi"}]

    try{
        factory.build(configuration);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe('Invalid operation name')
        expect(e).toBeInstanceOf(Error)
    }
})

test("CyclicOperationFactory elaborates a configuration but cyclic time is missing; returns an error", () =>{        
    var factory = new CyclicOperationFactory('con', 100, new ActionFactory())
    var configuration = new CyclingConfiguratrion()
    configuration.OperationName = 'opo'
    configuration.Parallel = false
    configuration.Actions= [ {name:"deletefile", folder:"C:/pppp/low", subNamePart:"oi"}]

    try{
        factory.build(configuration);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe('Invalid Cyclictime for operation: opo')
        expect(e).toBeInstanceOf(Error)
    }
})

test("CyclicOperationFactory elaborates a configuration but action list is empty; returns an error", () =>{        
    var factory = new CyclicOperationFactory('con', 100, new ActionFactory())
    var configuration = new CyclingConfiguratrion()
    configuration.OperationName = 'opo'
    configuration.CyclingTime = 78
    configuration.Parallel = false
    configuration.Actions= []

    try{
        factory.build(configuration);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe("Empty action's list for operation: opo")
        expect(e).toBeInstanceOf(Error)
    }
})

test("CyclicOperationFactory elaborates a configuration but action list is empty; returns an error", () =>{        
    var factory = new CyclicOperationFactory('con', 100, new ActionFactory())
    var configuration = new CyclingConfiguratrion()
    configuration.OperationName = 'opo'
    configuration.CyclingTime = 78
    configuration.Parallel = false
    configuration.Actions= null

    try{
        factory.build(configuration);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe("Null action's list for operation: opo")
        expect(e).toBeInstanceOf(Error)
    }
})