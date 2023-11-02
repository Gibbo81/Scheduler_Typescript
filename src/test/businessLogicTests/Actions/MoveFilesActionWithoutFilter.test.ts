import { MoveFilesActionWithoutFilter } from "../../../businessLogic/Actions/MoveFilesActionWithoutFilter"

test('No files are present therefore the actions does not move any file', async () =>{        
    var files : string[]= []
    var action = new MoveFilesActionWithoutFilterMock("", "", files)
    
    var result = await action.execute()

    expect(action.Moved.length).toBe(0)
    expect(result.MoveFilesAction).toBe('Completed')
  }
)

test('Two files are present therefore the actions moves both', async () =>{        
    var files : string[]= ['a', 'b']
    var action = new MoveFilesActionWithoutFilterMock("", "", files)
    
    var result = await action.execute()

    expect(action.Moved.length).toBe(2)
    expect(action.Moved[0]).toBe(files[0])
    expect(action.Moved[1]).toBe(files[1])
    expect(result.MoveFilesAction).toBe('Completed')
  }
)

class MoveFilesActionWithoutFilterMock extends MoveFilesActionWithoutFilter{
    public Moved : string[] = []

    constructor(startingFolder:string, destinationFolder:string, private filesPresent :string[]) 
    {
        super(startingFolder, destinationFolder)
    }

    protected override async readAllfiles(): Promise<string[]> {
        return Promise.resolve(this.filesPresent)
    }

    protected override async moveFile(startingFolder: string, f: string, destinationFolder: string) : Promise<void>{
        this.Moved.push(f)
    }
}
