import { RenameActions } from "../../../businessLogic/Actions/RenameAction"

test('Three entities are present, two match the filter,  therefore the action renames both', async () =>{        
    var entities : string[]= ['pippoa', 'b', "ppppipponn"]
    var action = new RenameActionsWithFilterMock("pippo", 'pluto', entities)
    
    var result = await action.execute()

    expect(action.RenamedOld.length).toBe(2)
    expect(action.RenamedNew.length).toBe(2)
    expect(action.RenamedOld[0]).toBe(entities[0])
    expect(action.RenamedNew[0]).toBe(entities[0].replace("pippo", 'pluto'))
    expect(action.RenamedOld[1]).toBe(entities[2])
    expect(action.RenamedNew[1]).toBe(entities[2].replace("pippo", 'pluto'))
    expect(result.Status).toBe('Completed')
    expect(result.Name).toBe('RenameActions')
  }
)

test('Three entities are present, but no one matches the filter, the action does no rename any entity', async () =>{        
    var entities : string[]= ['pipoa', 'b', "ppppippnn"]
    var action = new RenameActionsWithFilterMock("pippo", 'pluto', entities)
    
    var result = await action.execute()

    expect(action.RenamedOld.length).toBe(0)
    expect(action.RenamedNew.length).toBe(0)
    expect(result.Status).toBe('Completed')
    expect(result.Name).toBe('RenameActions')
  }
)

test('No entities are present, the action does nothing', async () =>{        
    var entities : string[]= []
    var action = new RenameActionsWithFilterMock("pippo", 'pluto', entities)
    
    var result = await action.execute()

    expect(action.RenamedOld.length).toBe(0)
    expect(action.RenamedNew.length).toBe(0)
    expect(result.Status).toBe('Completed')
    expect(result.Name).toBe('RenameActions')
  }
)

test('Error during execution, the action returns failed status', async () =>{        
    var action = new RenameActionsWithFilterBrokenMock("pippo", 'pluto')
    
    var result = await action.execute()

    expect(result.Status).toBe('Failure')
    expect(result.Name).toBe('RenameActions')
  }
)

class RenameActionsWithFilterMock extends RenameActions{
    public RenamedOld : string[] = []
    public RenamedNew : string[] = []

    constructor(search: string, substitute: string, private entitiesPresent :string[]) 
    {
        super(search, substitute)
    }
    
    protected async renameEntity(oldName: string, newName: string): Promise<void> {
        this.RenamedOld.push(oldName)
        this.RenamedNew.push(newName)        
    }    

    protected override async readAllEntities(): Promise<string[]> {
        return Promise.resolve(this.entitiesPresent)
    }    
}

class RenameActionsWithFilterBrokenMock extends RenameActions{
    protected readAllEntities(): Promise<string[]> {
        throw new Error("Method not implemented.")
    }
    protected renameEntity(oldName: string, newName: string): Promise<void> {
        throw new Error("Method not implemented.")
    }    
}