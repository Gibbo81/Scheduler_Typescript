import { Action } from "../../businessLogic/Actions/Action";
import { BaseConnection } from "../BaseConnection";

export class ExecuteScript extends BaseConnection implements Action{
    
    constructor(db: string, private script: string){
        super(db)
    }
    
    async execute(): Promise<{ [key: string]: string; }> {
        try{
            return await this.tryExecute();
        }
        catch{
            return { 'Name': 'ExecuteScriptSqlLite', 'Status': 'Fail' }
        }

    }

    private async tryExecute() {        
        var result = await this.runScript();
        return { 'Name': 'ExecuteScriptSqlLite', 'Status': 'Completed' };
    }

    protected runScript() : Promise<void>{
        var db = this.OpenConnection();
        return new Promise((resolve, reject) => {
            db.run(this.script, 
                   {}, 
                   function(err) {
                    if (err) {      
                        db.close()
                        reject()
                    } 
                    else {
                        db.close()
                        resolve()
                    }
               })
        })
    }
}