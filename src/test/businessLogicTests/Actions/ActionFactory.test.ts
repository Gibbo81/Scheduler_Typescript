import { ActionFactory } from "../../../businessLogic/Actions/ActionFactory"
import { DeleteFilesAction } from "../../../businessLogic/Actions/DeleteFilesAction";

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

test('Action factory creates "DeleteFile" action, no error the action is created', () =>{        
    var factory = new ActionFactory()
    var configurations = { 
        name : 'deleteFILE',
        folder : '123pippo'
    }

    var result = factory.create(configurations);

    expect(result).toBeInstanceOf(DeleteFilesAction)
  }
)

test("Action factory creates 'DeleteFile' action but doesn't find action folder, throws error", () =>{        
    var factory = new ActionFactory()
    var configurations = {name : 'deleteFILE'}

    try{
        factory.create(configurations);
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe('Action deletefile is missing folder.')
        expect(e).toBeInstanceOf(Error)
    }
})
