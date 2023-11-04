import { DeleteAction } from "../../../businessLogic/Actions/DeleteAction"

test('No entities are present therefore no entities are deleted', async () =>{        
    var action = new DeleteActionWrapper("", [])
    
    var result = await action.execute()

    expect(action.Deleted.length).toBe(0)
    expect(result.DeleteAction).toBe('Completed')
  }
)

test('Four entities are present without any filter (empty string), all are deleted', async () =>{        
    var noFilterEmptyString =''
    var action = new DeleteActionWrapper(noFilterEmptyString, ["aa1", "1aa2", "gth", "uaua2"])
    
    var result = await action.execute()

    expect(action.Deleted.length).toBe(4)
    expect(result.DeleteAction).toBe('Completed')
  }
)

test('Four entities are present without any filter (null), all are deleted', async () =>{        
    var noFilter_Null =null
    var action = new DeleteActionWrapper(noFilter_Null, ["aa1", "1aa2", "gth", "uaua2"])
    
    var result = await action.execute()

    expect(action.Deleted.length).toBe(4)
    expect(result.DeleteAction).toBe('Completed')
  }
)

test('Four entities are present without any filter (undefined), all are deleted', async () =>{        
    var noFilter_Undefined =undefined
    var action = new DeleteActionWrapper(noFilter_Undefined, ["aa1", "1aa2", "gth", "uaua2"])
    
    var result = await action.execute()

    expect(action.Deleted.length).toBe(4)
    expect(result.DeleteAction).toBe('Completed')
  }
)

test('Four entities are present but only two matche the filter, two are deleted', async () =>{        
    var filter ='aa'
    var action = new DeleteActionWrapper(filter, ["1aa2", "gth", "aa1", "uaua2"])
    
    var result = await action.execute()

    expect(action.Deleted.length).toBe(2)
    expect(action.Deleted[0]).toBe('1aa2')
    expect(action.Deleted[1]).toBe('aa1')
    expect(result.DeleteAction).toBe('Completed')
  }
)

class DeleteActionWrapper extends DeleteAction{
    public Deleted : string[] = []
    constructor(subName:string, private entitiesPresent :string[]){ super(subName) }

    protected override async readAllEntities(): Promise<string[]> {
        return Promise.resolve(this.entitiesPresent)
    }
    
    protected override async deleteEntity(f: string): Promise<undefined> {
        this.Deleted.push(f)
        return Promise.resolve(undefined)
    }
}