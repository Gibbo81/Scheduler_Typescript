import { ExecuteScript } from "../../SqlLite/Action/ExecuteScript"


test("The script execution doesn't go in error, return success", async () =>{        
    var noError = true
    var action = new ExecuteScriptWrapper('', '', noError)
    
    var result = await action.execute()

    expect(result.Status).toBe('Completed')
    expect(result.Name).toBe('ExecuteScriptSqlLite')
  }
)

test("The script execution goes in error, return failure", async () =>{        
    var noError = false
    var action = new ExecuteScriptWrapper('', '', noError)
    
    var result = await action.execute()

    expect(result.Status).toBe('Fail')
    expect(result.Name).toBe('ExecuteScriptSqlLite')
  }
)

class ExecuteScriptWrapper extends ExecuteScript{
    public Parameters :string[] =[]
    
    constructor(db: string, script: string, private IsSuccessful: boolean){
        super(db, script)
    }

    protected override runScript() : Promise<void>{
        if (this.IsSuccessful)            
            return new Promise((resolve, reject) => resolve())    
        return new Promise((resolve, reject) => reject())
    }
}