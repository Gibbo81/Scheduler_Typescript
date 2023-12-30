import { ActionFactory } from "../../../service/ActionFactory";
import { CyclicOperationFactory } from "../../../businessLogic/Operations/CyclicOperationFactory";
import { CyclingConfiguratrion } from "../../../service/dto/CyclingConfiguratrion";
import { CyclicOperationOnErrorGoOn } from "../../../businessLogic/Operations/CyclicOperationOnErrorGoOn";
import { CyclicOperationOnErrorStop } from "../../../businessLogic/Operations/CyclicOperationOnErrorStop";

test("CyclicOperationFactory elaborates a valid configuration with 'OnErrorGoOn' TRUE, returns the correct object", () =>{        
    var factory = new CyclicOperationFactory('con', 100, new ActionFactory())
    var configuration = new CyclingConfiguratrion()
    configuration.OnErrorGoOn = true
    configuration.OperationName = 'Pippus'
    configuration.CyclingTime = 78
    configuration.Parallel = false
    configuration.Actions= [ {name:"deletefiles", folder:"C:/pppp/low", subNamePart:"oi"}]

    var result =factory.build(configuration);

    expect(result).toBeInstanceOf(CyclicOperationOnErrorGoOn)
})

test("CyclicOperationFactory elaborates a valid configuration with 'OnErrorGoOn' FALSE, returns the correct object", () =>{        
    var factory = new CyclicOperationFactory('con', 100, new ActionFactory())
    var configuration = new CyclingConfiguratrion()
    configuration.OnErrorGoOn = false
    configuration.OperationName = 'Pippus'
    configuration.CyclingTime = 78
    configuration.Parallel = false
    configuration.Actions= [ {name:"deletefiles", folder:"C:/pppp/low", subNamePart:"oi"}]

    var result =factory.build(configuration);

    expect(result).toBeInstanceOf(CyclicOperationOnErrorStop)
})

test("CyclicOperationFactory elaborates a configuration but operation name is missing; returns an error", () =>{        
    var factory = new CyclicOperationFactory('con', 100, new ActionFactory())
    var configuration = new CyclingConfiguratrion()
    configuration.CyclingTime = 78
    configuration.Parallel = false
    configuration.Actions= [ {name:"deletefiles", folder:"C:/pppp/low", subNamePart:"oi"}]

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
    configuration.Actions= [ {name:"deletefiles", folder:"C:/pppp/low", subNamePart:"oi"}]

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