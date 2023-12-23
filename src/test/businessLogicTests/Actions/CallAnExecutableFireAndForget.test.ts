import { CallAnExecutableFireAndForget } from "../../../businessLogic/Actions/CallAnExecutableFireAndForget"


test('Creates the action with two couple, the execution takes four parameters', async () =>{        
    var parameters: { [key: string]: string }={
        "a" : "aaa",
        "t" : "222"
    }
    var action = new CallAnExecutableFireAndForgetWrapper('', parameters)
    
    var result = await action.execute()

    expect(action.Parameters.length).toBe(4)
    expect(action.Parameters[0]).toBe('--a')
    expect(action.Parameters[1]).toBe('aaa')
    expect(action.Parameters[2]).toBe('--t')
    expect(action.Parameters[3]).toBe('222')
    expect(result.Status).toBe('Completed')
    expect(result.Name).toBe('CallAnExecutable')
    
  }
)

test('The action goes in error, the code returns a failure status', async () =>{        
    var action = new CallAnExecutableFireAndForgetWrapperError('', {})


    var result = await action.execute()

    expect(result.Status).toBe('Failure')
    expect(result.Name).toBe('CallAnExecutable')
  }
)

class CallAnExecutableFireAndForgetWrapper extends CallAnExecutableFireAndForget{
    public Parameters :string[] =[]
    
    constructor(executablePath: string, parameters: { [key: string]: string }){
        super(executablePath, parameters)
    }     
    
    protected lunch(): void {
       this.parameters.forEach(p => this.Parameters.push(p))
    }    
}

class CallAnExecutableFireAndForgetWrapperError extends CallAnExecutableFireAndForget{
      constructor(executablePath: string, parameters: { [key: string]: string }){
        super(executablePath, parameters)
    }     
    
    protected lunch(): void {
       throw new Error(':-(')
    }    
}