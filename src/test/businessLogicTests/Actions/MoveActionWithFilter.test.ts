import { MoveActionWithFilter } from "../../../businessLogic/Actions/MoveActionWithFilter"

test('No entities are present therefore the actions does not move any entitiy', async () =>{        
    var entities : string[]= []
    var action = new MoveEntitiesActionWithFilterMock("pippus", entities)
    
    var result = await action.execute()

    expect(action.Moved.length).toBe(0)
    expect(result.Status).toBe('Completed')
    expect(result.Name).toBe('MoveEntitiesAction')
  }
)

test('Two entities are present but they do not mathc the filter, therefore the actions does not move any entities', async () =>{        
    var entities : string[]= ['a', 'b']
    var action = new MoveEntitiesActionWithFilterMock("pippus", entities)
    
    var result = await action.execute()

    expect(action.Moved.length).toBe(0)
    expect(result.Status).toBe('Completed')
    expect(result.Name).toBe('MoveEntitiesAction')
  }
)

test('Two entities are present, both match the filter,  therefore the actions moves both', async () =>{        
    var entities : string[]= ['pippoa', 'bpippobbbb']
    var action = new MoveEntitiesActionWithFilterMock("pippo", entities)
    
    var result = await action.execute()

    expect(action.Moved.length).toBe(2)
    expect(action.Moved[0]).toBe(entities[0])
    expect(action.Moved[1]).toBe(entities[1])
    expect(result.Status).toBe('Completed')
    expect(result.Name).toBe('MoveEntitiesAction')
  }
)

test('Two entities are present, one match the filter,  therefore the actions moves only it', async () =>{        
    var entities : string[]= ['pippoa', 'b']
    var action = new MoveEntitiesActionWithFilterMock("pippo", entities)
    
    var result = await action.execute()

    expect(action.Moved.length).toBe(1)
    expect(action.Moved[0]).toBe(entities[0])
    expect(result.Status).toBe('Completed')
    expect(result.Name).toBe('MoveEntitiesAction')
  }
)

test('Error reading, the action returns an error result', async () =>{        
    var action = new MoveEntitiesActionWithFilterBrokenMock("pippo")
    
    var result = await action.execute()

    expect(result.Status).toBe('Failure')
    expect(result.Name).toBe('MoveEntitiesAction')
  }
)

class MoveEntitiesActionWithFilterMock extends MoveActionWithFilter{
    public Moved : string[] = []

    constructor(subNamePart: string, private entitiesPresent :string[]) 
    {
        super(subNamePart)
    }

    protected override async readAllEntities(): Promise<string[]> {
        return Promise.resolve(this.entitiesPresent)
    }

    protected override async moveEntities(entities: string[]) : Promise<void>{
        for (var f of entities)
            this.Moved.push(f)
    }
}

class MoveEntitiesActionWithFilterBrokenMock extends MoveActionWithFilter{
    protected readAllEntities(): Promise<string[]> {
        throw new Error("Method not implemented.")
    }
    protected moveEntities(entities: string[]): Promise<void> {
        throw new Error("Method not implemented.")
    }
    
}