import { IsToExecuteCyclic } from "../businessLogic/IsToExecuteCyclic";
import { CloseOperation } from "../businessLogic/plugIn/CloseOperation";
import { OperationStatus } from "../businessLogic/plugIn/OperationStatus";

export class CheckCyclicAction implements OperationStatus, CloseOperation {
    private readonly readCommand : string = 
`SELECT *
FROM OperationLastExecution
WHERE Name= ? `
private readonly insertCommand : string = 
`INSERT INTO OperationLastExecution(
	Name,
	LastExecution,
	InExecution,
	ExecutionStarted,
	SchedulerInCharge
)
VALUES (?, ?, 1, ?, ?)` 
    
    
    constructor(private db: string, private schedureId: number){}
    close(operationName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    read(name: string): Promise<IsToExecuteCyclic | undefined> {
        const sqlite3 = require('sqlite3').verbose();
        var db = new sqlite3.Database(this.db)     
        return new Promise((resolve, reject) => {
            db.all(this.readCommand, [name], (err:any, rows:{ [key: string]: string|number; }[]) => {                
                if (err) {      
                    db.close()
                    reject(err)
                } 
                else if (rows.length===0) resolve(undefined)                                    
                else resolve( new IsToExecuteCyclic(name, new Date(rows[0].LastExecution), rows[0].InExecution===1,  this))
            })
        })
    }
    
    // check(): Promise<boolean> {
    //     const sqlite3 = require('sqlite3').verbose();
    //     var db = new sqlite3.Database(this.db)       
    //     return new Promise((resolve, reject) => {
    //         db.all(this.readCommand, [this.operationName ], (err:any, rows:[]) => {                
    //             if (err) {      //Remove business logic from this class
    //                 db.close()
    //                 reject(err)
    //             } 
    //             else if (rows.length>0) {
    //                 //TODO
    //                 resolve(true)
    //             }
    //             else {                                                  //TODO string in a more readable way
    //                 db.run(this.insertCommand, [this.operationName, new Date().toString(), new Date().toString(), this.schedureId], 
    //                 (err: any) => {
    //                     if (err) resolve(false)
    //                     else resolve(true)
    //                 })}                
    //         })
    //     })
    // }

}