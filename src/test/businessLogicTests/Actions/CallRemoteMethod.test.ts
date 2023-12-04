import { CallRemoteMethod, RemoteCallResult } from "../../../businessLogic/Actions/CallRemoteMethod"

test('Calls the remote method successfully, returns a completed status  ', async () =>{            
    var action = new CallRemoteMethodtWrapper(RemoteCallResult.Success)
    
    var result = await action.execute()

    expect(result.Status).toBe('Completed')
    expect(result.Name).toBe('CallRemoteMethod')    
  }
)

test('Fails to call the remote method, returns a failure status  ', async () =>{            
    var action = new CallRemoteMethodtWrapper(RemoteCallResult.Failure)
    
    var result = await action.execute()

    expect(result.Status).toBe('Failure')
    expect(result.Name).toBe('CallRemoteMethod')    
  }
)

test('Error calling the remote method, returns a failure status  ', async () =>{            
    var action = new CallRemoteMethodtWrapperError()
    
    var result = await action.execute()

    expect(result.Status).toBe('Failure')
    expect(result.Name).toBe('CallRemoteMethod')    
  }
)

class CallRemoteMethodtWrapper extends CallRemoteMethod{    
    constructor(private result: RemoteCallResult) {
        super()
    }    
    
    protected callMethod(): Promise<RemoteCallResult> {
        return Promise.resolve(this.result)
    }    
}

class CallRemoteMethodtWrapperError extends CallRemoteMethod{    
    constructor() {super()}    
    
    protected callMethod(): Promise<RemoteCallResult> {
        throw new Error("Error :-(")
    }    
}