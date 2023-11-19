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
    expect(result.CallAnExecutable).toBe('Completed')
  }
)

test('The action goes in error, the code does not catch the excetion', async () =>{        
    var action = new CallAnExecutableFireAndForgetWrapperError('', {})

    try{
        await action.execute()
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe(':-(')
        expect(e).toBeInstanceOf(Error)
    }
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