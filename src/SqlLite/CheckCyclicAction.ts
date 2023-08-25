import { IsToExecute } from "../businessLogic/plugIn/IsToExecute";

export class CheckCyclicAction implements IsToExecute{//IsToExecute is business logic remove from DB, hew only the queries
    private readonly readCommand : string = 
`SELECT Name
FROM OperationLastExecution
WHERE Name= ? AND
 	  InExecution = 0 AND
 	  SchedulerInCharge IS NULL`
private readonly insertCommand : string = 
`INSERT INTO OperationLastExecution(
	Name,
	LastExecution,
	InExecution,
	ExecutionStarted,
	SchedulerInCharge
)
VALUES (?, ?, 1, ?, ?)` 
    
    
    constructor(private operationName: string, 
                private operationCycle: number,
                private db: string,
                private schedureId: number){}
    
    check(): Promise<boolean> {
        const sqlite3 = require('sqlite3').verbose();
        var db = new sqlite3.Database(this.db)       
        return new Promise((resolve, reject) => {
            db.all(this.readCommand, [this.operationName ], (err:any, rows:[]) => {                
                if (err) {      //Remove business logic from this class
                    db.close()
                    reject(err)
                } 
                else if (rows.length>0) {
                    //TODO
                    resolve(true)
                }
                else {                                                  //TODO string in a more readable way
                    db.run(this.insertCommand, [this.operationName, new Date().toString(), new Date().toString(), this.schedureId], 
                    (err: any) => {
                        if (err) resolve(false)
                        else resolve(true)
                    })}                
            })
        })
    }

}