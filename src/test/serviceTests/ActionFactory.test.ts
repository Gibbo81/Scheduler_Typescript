import { ActionFactory } from "../../service/ActionFactory"
import { DeleteFilesAction } from "../../fileSystem/actions/DeleteFilesAction";
import { MoveFilesActionWithoutFilter } from "../../fileSystem/actions/MoveFilesActionWithoutFilter";
import { MoveFilesActionWithFilter } from "../../fileSystem/actions/MoveFileActionWithFilter";
import { RenameFilesAction } from "../../fileSystem/actions/RenameFilesAction";
import { CallAnExecutableFireAndForgetFromFileSystem } from "../../fileSystem/actions/CallAnExecutableFireAndForgetFromFileSystem";
import { CallAnExecutableWaitingCompletionFromFileSystem } from "../../fileSystem/actions/CallAnExecutableWaitingCompletionFromFileSystem";
import { WebApiGet } from "../../webCall/Actions/WebApiGet";

test('Action factory creates "callremotemethod" action (GET), no error inside the configurations, it creates the right action', () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'callremotemethod',
        verb : 'GeT',
        route : 'https://jsonplaceholder.typicode.com/todos/4'
    }

    var result = factory.create(configurations);

    expect(result).toBeInstanceOf(WebApiGet)
  }
)

test('Action factory creates "callremotemethod" action (GET), no error inside the configurations, it creates the right action', () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'callremotemethod',
        verb : 'GeT',
        route : 'https://jsonplaceholder.typicode.com/todos/4'
    }

    var result = factory.create(configurations);

    expect(result).toBeInstanceOf(WebApiGet)
  }
)

test("Action factory creates 'callremotemethod' action, it doesn't recognize the verb, it throws an error", () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'callremotemethod',
        verb : 'WRONG ONE',
        route : 'https://jsonplaceholder.typicode.com/todos/4'
    }

    try{
        factory.create(configurations);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe("Unrecognized WebMethod verb: WRONG ONE")
        expect(e).toBeInstanceOf(Error)
    }
  }
)

test("Action factory creates 'callremotemethod' action, configuration doesn't include the verb, it throws an error", () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'callremotemethod',
        route : 'https://jsonplaceholder.typicode.com/todos/4'
    }

    try{
        factory.create(configurations);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe("Action call remote method is missing the verb.")
        expect(e).toBeInstanceOf(Error)
    }
  }
)

test("Action factory creates 'callremotemethod' action, configuration doesn't include the route, it throws an error", () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'callremotemethod',
        verb : 'get',
    }

    try{
        factory.create(configurations);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe("Action call remote method is missing the route.")
        expect(e).toBeInstanceOf(Error)
    }
  }
)

test('Action factory creates "callexe" action (fire and forget mode), no error inside the configurations, it creates the right action', () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'callexe',
        fireandforget : 'true',
        exepath : 'uu.exe',
        par1 : 'sub1',
        par2 : 'sub2',
        p3: '3sub'
    }

    var result = factory.create(configurations);

    expect(result).toBeInstanceOf(CallAnExecutableFireAndForgetFromFileSystem)
  }
)

test('Action factory creates "callexe" action (waiting mode), no error inside the configurations, it creates the right action', () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'callexe',
        fireandforget : 'false',
        exepath : 'uu.exe'
    }

    var result = factory.create(configurations);

    expect(result).toBeInstanceOf(CallAnExecutableWaitingCompletionFromFileSystem)
  }
)

test("Action factory creates 'callexe' action but executable path is not valid (it doesn't end in .exe), throws error", () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'callexe',
        fireandforget : 'false',
        exepath : 'uu'
    }

    try{
        factory.create(configurations);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe("Action call executable has an executable path that do not end in '.exe'.")
        expect(e).toBeInstanceOf(Error)
    }
})

test("Action factory creates 'callexe' action but doesn't find working mode, throws error", () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'callexe',
        exepath : 'uu.exe'
    }

    try{
        factory.create(configurations);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe('Action call executable is missing working mode.')
        expect(e).toBeInstanceOf(Error)
    }
})

test("Action factory creates 'callexe' action but doesn't find exepath, throws error", () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'callexe',
        fireandforget : 'true'
    }

    try{
        factory.create(configurations);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe('Action call executable is missing exe path.')
        expect(e).toBeInstanceOf(Error)
    }
})

test("Action factory creates 'renamefiles' action but doesn't find folder, throws error", () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'RENAMEFILES',
        search : 'uu',
        substitute : 'sub'
    }

    try{
        factory.create(configurations);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe('Action renamefile is missing starting folder.')
        expect(e).toBeInstanceOf(Error)
    }
})

test("Action factory creates 'renamefiles' action but doesn't find search parameter, throws error", () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'RENAMEFILES',
        folder : 'star456',
        substitute : 'sub'
    }

    try{
        factory.create(configurations);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe('Action renamefile is missing search pattern.')
        expect(e).toBeInstanceOf(Error)
    }
})

test("Action factory creates 'renamefiles' action but doesn't find substitute value, throws error", () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'RENAMEFILES',
        folder : 'star456',
        search : 'uu'
    }

    try{
        factory.create(configurations);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe('Action renamefile is missing substitute value.')
        expect(e).toBeInstanceOf(Error)
    }
})


test('Action factory creates "renamefiles", no error it creates the right action', () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'RENAMEFILES',
        folder : 'star456',
        search : 'uu',
        substitute : 'sub'
    }

    var result = factory.create(configurations);

    expect(result).toBeInstanceOf(RenameFilesAction)
  }
)

test("Action factory doesn't find action name, throws error", () =>{        
    var factory = new ActionFactory()
    var configurations = { }

    try{
        factory.create(configurations);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe('Action name is missing.')
        expect(e).toBeInstanceOf(Error)
    }
})

test("Action factory creates 'MoveFiles' action but doesn't find action folder, throws error", () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'MoveFilEs',
        destinationFolder : 'star456'
    }

    try{
        factory.create(configurations);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe('Action movefile is missing starting folder.')
        expect(e).toBeInstanceOf(Error)
    }
})

test("Action factory creates 'MoveFiles' action but doesn't find destination folder, throws error", () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'MoveFilEs',
        folder : 'star456',
        subNamePart : 'uu'
    }

    try{
        factory.create(configurations);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe('Action movefile is missing destination folder.')
        expect(e).toBeInstanceOf(Error)
    }
})

test('Action factory creates "MoveFiles" action without a filter, no error it creates the right action', () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'MoveFilEs',
        folder : '123pippo',
        destinationFolder : 'star456'
    }

    var result = factory.create(configurations);

    expect(result).toBeInstanceOf(MoveFilesActionWithoutFilter)
  }
)

test('Action factory creates "MoveFiles" action with a filter,  no error it creates the right action', () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'MoveFilEs',
        folder : '123pippo',
        destinationFolder : 'star456',
        subNamePart : 'uu'
    }

    var result = factory.create(configurations);

    expect(result).toBeInstanceOf(MoveFilesActionWithFilter)
  }
)

test('Action factory creates "DeleteFiles" action, no error it creates the right action', () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'deleteFILES',
        folder : '123pippo'
    }

    var result = factory.create(configurations);

    expect(result).toBeInstanceOf(DeleteFilesAction)
  }
)

test("Action factory creates 'DeleteFiles' action but doesn't find action folder, throws error", () =>{        
    var factory = new ActionFactory()
    var configurations = {name : 'deleteFILES'}

    try{
        factory.create(configurations);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe('Action deletefile is missing working folder.')
        expect(e).toBeInstanceOf(Error)
    }
})

test("Action factory does not recognize the zction type, it throws an error", () =>{        
    var factory = new ActionFactory()
    var configurations = {name : 'PIPPO PLUTO 124'}

    try{
        factory.create(configurations);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe('Unrecognized Action.')
        expect(e).toBeInstanceOf(Error)
    }
})
