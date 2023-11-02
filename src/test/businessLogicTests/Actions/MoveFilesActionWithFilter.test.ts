import { MoveFilesActionWithFilter } from "../../../businessLogic/Actions/MoveFilesActionWithFilter"

test('No files are present therefore the actions does not move any file', async () =>{        
    var files : string[]= []
    var action = new MoveFilesActionWithFilterMock("", "", "pippus", files)
    
    var result = await action.execute()

    expect(action.Moved.length).toBe(0)
    expect(result.MoveFilesAction).toBe('Completed')
  }
)

test('Two files are present but they do not mathc the filter, therefore the actions does not move any file', async () =>{        
    var files : string[]= ['a', 'b']
    var action = new MoveFilesActionWithFilterMock("", "", "pippus", files)
    
    var result = await action.execute()

    expect(action.Moved.length).toBe(0)
    expect(result.MoveFilesAction).toBe('Completed')
  }
)

test('Two files are present, both match the filter,  therefore the actions moves both', async () =>{        
    var files : string[]= ['pippoa', 'bpippobbbb']
    var action = new MoveFilesActionWithFilterMock("", "", "pippo", files)
    
    var result = await action.execute()

    expect(action.Moved.length).toBe(2)
    expect(action.Moved[0]).toBe(files[0])
    expect(action.Moved[1]).toBe(files[1])
    expect(result.MoveFilesAction).toBe('Completed')
  }
)

test('Two files are present, one match the filter,  therefore the actions moves only it', async () =>{        
    var files : string[]= ['pippoa', 'b']
    var action = new MoveFilesActionWithFilterMock("", "", "pippo", files)
    
    var result = await action.execute()

    expect(action.Moved.length).toBe(1)
    expect(action.Moved[0]).toBe(files[0])
    expect(result.MoveFilesAction).toBe('Completed')
  }
)

class MoveFilesActionWithFilterMock extends MoveFilesActionWithFilter{
    public Moved : string[] = []

    constructor(startingFolder:string, destinationFolder:string, subNamePart: string, private filesPresent :string[]) 
    {
        super(startingFolder, destinationFolder, subNamePart)
    }

    protected override async readAllfiles(): Promise<string[]> {
        return Promise.resolve(this.filesPresent)
    }

    protected override async moveFile(startingFolder: string, f: string, destinationFolder: string) : Promise<void>{
        this.Moved.push(f)
    }
}
