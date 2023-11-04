import { MoveActionWithFilter } from "../../../businessLogic/Actions/MoveActionWithFilter"

test('No entities are present therefore the actions does not move any entitiy', async () =>{        
    var entities : string[]= []
    var action = new MoveEntitiesActionWithFilterMock("pippus", entities)
    
    var result = await action.execute()

    expect(action.Moved.length).toBe(0)
    expect(result.MoveEntitiesAction).toBe('Completed')
  }
)

test('Two entities are present but they do not mathc the filter, therefore the actions does not move any entities', async () =>{        
    var entities : string[]= ['a', 'b']
    var action = new MoveEntitiesActionWithFilterMock("pippus", entities)
    
    var result = await action.execute()

    expect(action.Moved.length).toBe(0)
    expect(result.MoveEntitiesAction).toBe('Completed')
  }
)

test('Two entities are present, both match the filter,  therefore the actions moves both', async () =>{        
    var entities : string[]= ['pippoa', 'bpippobbbb']
    var action = new MoveEntitiesActionWithFilterMock("pippo", entities)
    
    var result = await action.execute()

    expect(action.Moved.length).toBe(2)
    expect(action.Moved[0]).toBe(entities[0])
    expect(action.Moved[1]).toBe(entities[1])
    expect(result.MoveEntitiesAction).toBe('Completed')
  }
)

test('Two entities are present, one match the filter,  therefore the actions moves only it', async () =>{        
    var entities : string[]= ['pippoa', 'b']
    var action = new MoveEntitiesActionWithFilterMock("pippo", entities)
    
    var result = await action.execute()

    expect(action.Moved.length).toBe(1)
    expect(action.Moved[0]).toBe(entities[0])
    expect(result.MoveEntitiesAction).toBe('Completed')
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
