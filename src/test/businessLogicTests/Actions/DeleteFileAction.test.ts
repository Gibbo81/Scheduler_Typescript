import { DeleteFileAction } from "../../../businessLogic/Actions/DeleteFileAction"

test('No files are present therefore no files are deleted', async () =>{        
    var action = new DeleteFileActionWrapper("", "", [])
    
    var result = await action.execute()

    expect(action.Deleted.length).toBe(0)
    expect(result.DeleteFileAction).toBe('Completed')
  }
)

test('Four files are present without any filter (empty string), all are deleted', async () =>{        
    var noFilterEmptyString =''
    var action = new DeleteFileActionWrapper("", noFilterEmptyString, ["aa1", "1aa2", "gth", "uaua2"])
    
    var result = await action.execute()

    expect(action.Deleted.length).toBe(4)
    expect(result.DeleteFileAction).toBe('Completed')
  }
)

test('Four files are present without any filter (null), all are deleted', async () =>{        
    var noFilter_Null =null
    var action = new DeleteFileActionWrapper("", noFilter_Null, ["aa1", "1aa2", "gth", "uaua2"])
    
    var result = await action.execute()

    expect(action.Deleted.length).toBe(4)
    expect(result.DeleteFileAction).toBe('Completed')
  }
)

test('Four files are present without any filter (undefined), all are deleted', async () =>{        
    var noFilter_Undefined =undefined
    var action = new DeleteFileActionWrapper("", noFilter_Undefined, ["aa1", "1aa2", "gth", "uaua2"])
    
    var result = await action.execute()

    expect(action.Deleted.length).toBe(4)
    expect(result.DeleteFileAction).toBe('Completed')
  }
)

test('Four files are present but only two matche the filter, two are deleted', async () =>{        
    var filter ='aa'
    var action = new DeleteFileActionWrapper("", filter, ["1aa2", "gth", "aa1", "uaua2"])
    
    var result = await action.execute()

    expect(action.Deleted.length).toBe(2)
    expect(action.Deleted[0]).toBe('1aa2')
    expect(action.Deleted[1]).toBe('aa1')
    expect(result.DeleteFileAction).toBe('Completed')
  }
)

class DeleteFileActionWrapper extends DeleteFileAction{
    public Deleted : string[] = []
    constructor(folder:string,  subName:string, private filesPresent :string[]){ super(folder, subName) }

    protected override async readAllfiles(): Promise<string[]> {
        return Promise.resolve(this.filesPresent)
    }
    
    protected override async deleteFile(f: string): Promise<undefined> {
        this.Deleted.push(f)
        return Promise.resolve(undefined)
    }
}