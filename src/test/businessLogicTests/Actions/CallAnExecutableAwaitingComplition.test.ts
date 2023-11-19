import { CallAnExecutableWaitingCompletion } from "../../../businessLogic/Actions/CallAnExecutableWaitingCompletion"

test('Creates the action with two couple, the execution takes four parameters', async () =>{        
    var parameters: { [key: string]: string }={
        "b" : "aaa",
        "oo" : "222"
    }
    var action = new CallAnExecutableWaitingCompletionWrapper('', parameters)
    
    var result = await action.execute()

    expect(action.Parameters.length).toBe(4)
    expect(action.Parameters[0]).toBe('--b')
    expect(action.Parameters[1]).toBe('aaa')
    expect(action.Parameters[2]).toBe('--oo')
    expect(action.Parameters[3]).toBe('222')
    expect(result.CallAnExecutable).toBe('Completed')
  }
)

test('The action goes in error, the code does not catch the excetion', async () =>{        
    var action = new CallAnExecutableWaitingCompletionWrapperError('', {})

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

class CallAnExecutableWaitingCompletionWrapper extends CallAnExecutableWaitingCompletion{
    public Parameters :string[] =[]
    
    constructor(executablePath: string, parameters: { [key: string]: string }){
        super(executablePath, parameters)
    }     

    protected lunchAndWait(): Promise<void> {
        this.parameters.forEach(p => this.Parameters.push(p))
        return new Promise((resolve, reject) => { resolve()})
    }
}

class CallAnExecutableWaitingCompletionWrapperError extends CallAnExecutableWaitingCompletion{
      constructor(executablePath: string, parameters: { [key: string]: string }){
        super(executablePath, parameters)
    }     

    protected lunchAndWait(): Promise<void> {
        throw new Error(':-(')
    }

}