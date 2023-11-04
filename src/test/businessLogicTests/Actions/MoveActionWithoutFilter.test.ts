import { MoveActionWithoutFilter } from "../../../businessLogic/Actions/MoveActionWithoutFilter"

test('No entities are present therefore the actions does not move any entity', async () =>{        
    var entities : string[]= []
    var action = new MoveEntitiesActionWithoutFilterMock(entities)
    
    var result = await action.execute()

    expect(action.Moved.length).toBe(0)
    expect(result.MoveEntitiesActionWithoutFilter).toBe('Completed')
  }
)

test('Two entities are present therefore the actions moves both', async () =>{        
    var entities : string[]= ['a', 'b']
    var action = new MoveEntitiesActionWithoutFilterMock(entities)
    
    var result = await action.execute()

    expect(action.Moved.length).toBe(2)
    expect(action.Moved[0]).toBe(entities[0])
    expect(action.Moved[1]).toBe(entities[1])
    expect(result.MoveEntitiesActionWithoutFilter).toBe('Completed')
  }
)

class MoveEntitiesActionWithoutFilterMock extends MoveActionWithoutFilter{
    public Moved : string[] = []

    constructor(private entitiesPresent :string[]) { super()}

    protected override async readAllEntities(): Promise<string[]> {
        return Promise.resolve(this.entitiesPresent)
    }

    protected override async moveEntities(entities: string[]) : Promise<void>{
        for (var f of entities)
            this.Moved.push(f)
    }
}
