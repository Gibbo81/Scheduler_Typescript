import { ActionFactory } from "../../service/ActionFactory"
import { DeleteFilesAction } from "../../fileSystem/actions/DeleteFilesAction";
import { MoveFilesActionWithoutFilter } from "../../fileSystem/actions/MoveFilesActionWithoutFilter";
import { MoveFilesActionWithFilter } from "../../fileSystem/actions/MoveFileActionWithFilter";
import { RenameFilesAction } from "../../fileSystem/actions/RenameFilesAction";
import { CallAnExecutableFireAndForgetFromFileSystem } from "../../fileSystem/actions/CallAnExecutableFireAndForgetFromFileSystem";
import { CallAnExecutableWaitingCompletionFromFileSystem } from "../../fileSystem/actions/CallAnExecutableWaitingCompletionFromFileSystem";
import { WebApiGetWaitingCompletion } from "../../webCall/Actions/WebApiGetWaitingCompletion";
import { WebApiGetFireAndForget } from "../../webCall/Actions/WebApiGetFireAndForget";
import { WebApiPostFireAndForget } from "../../webCall/Actions/WebApiPostFireAndForget";
import { WebApiPostWaitingCompletion } from "../../webCall/Actions/WebApiPostWaitingCompletion";
import { WebApiDeleteFireAndForget } from "../../webCall/Actions/WebApiDeleteFireAndForget";
import { WebApiDeleteWaitingCompletition } from "../../webCall/Actions/WebApiDeleteWaitingCompletition";
import { ExecuteScript } from "../../SqlLite/Action/ExecuteScript";

test("Action factory creates 'executesqlightscript' action but the script sequel is missing, it throws an error", () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'executesqlightscriPT',
        db: 'C:/Repo/Scheduler_Typescript/src/SqlLite/Test_DB/Scheduler.db'
    }

    try{
        factory.create(configurations);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe("Action executesqlightscript is missing the script command.")
        expect(e).toBeInstanceOf(Error)
    }
  }
)

test("Action factory creates 'executesqlightscript' action but the db is missing, it throws an error", () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'executesqlightscriPT',
        script : 'insert into ....' 
    }

    try{
        factory.create(configurations);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe("Action executesqlightscript is missing the DB.")
        expect(e).toBeInstanceOf(Error)
    }
  }
)

test('Action factory creates "executesqlightscript" action, no error inside the configurations, it creates the right action', () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'executesqlightscriPT',
        script : 'insert into ....',
        db: 'C:/Repo/Scheduler_Typescript/src/SqlLite/Test_DB/Scheduler.db'
    }

    var result = factory.create(configurations);

    expect(result).toBeInstanceOf(ExecuteScript)
  }
)

test('Action factory creates "callremotemethod" action (delete - fire and forget), no error inside the configurations, it creates the right action', () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'callremotemethod',
        verb : 'delete',
        fireandforget: 'true',
        route : 'https://jsonplaceholder.typicode.com/todos/4'
    }

    var result = factory.create(configurations);

    expect(result).toBeInstanceOf(WebApiDeleteFireAndForget)
  }
)

test('Action factory creates "callremotemethod" action (delete - waiting for cmpletition), no error inside the configurations, it creates the right action', () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'callremotemethod',
        verb : 'delete',
        fireandforget: 'false',
        route : 'https://jsonplaceholder.typicode.com/todos/4'
    }

    var result = factory.create(configurations);

    expect(result).toBeInstanceOf(WebApiDeleteWaitingCompletition)
  }
)

test('Action factory creates "callremotemethod" action (Post - fire and forget), no error inside the configurations, it creates the right action', () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'callremotemethod',
        verb : 'POST',
        fireandforget: 'true',
        route : 'https://jsonplaceholder.typicode.com/todos/4',
        par1 : "abiy",
        par2 : "Pippus",
        lastone : "win win"
    }

    var result = factory.create(configurations);

    expect(result).toBeInstanceOf(WebApiPostFireAndForget)
  }
)

test('Action factory creates "callremotemethod" action (Post - waiting for cmpletition), no error inside the configurations, it creates the right action', () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'callremotemethod',
        verb : 'POST',
        fireandforget: 'false',
        route : 'https://jsonplaceholder.typicode.com/todos/4',
        par1 : "abiy",
        par2 : "Pippus",
        lastone : "win win"
    }

    var result = factory.create(configurations);

    expect(result).toBeInstanceOf(WebApiPostWaitingCompletion)
  }
)

test('Action factory creates "callremotemethod" action (GET - fire and forget), no error inside the configurations, it creates the right action', () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'callremotemethod',
        verb : 'GeT',
        fireandforget: 'true',
        route : 'https://jsonplaceholder.typicode.com/todos/4'
    }

    var result = factory.create(configurations);

    expect(result).toBeInstanceOf(WebApiGetFireAndForget)
  }
)

test('Action factory creates "callremotemethod" action GET (waiting for completion is the default), no error inside the configurations, it creates the right action', () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'callremotemethod',
        verb : 'GeT',
        route : 'https://jsonplaceholder.typicode.com/todos/4'
    }

    var result = factory.create(configurations);

    expect(result).toBeInstanceOf(WebApiGetWaitingCompletion)
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
        expect(e.message).toBe('Unrecognized Action: PIPPO PLUTO 124')
        expect(e).toBeInstanceOf(Error)
    }
})
