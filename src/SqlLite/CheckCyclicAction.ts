import { IsToExecute } from "../businessLogic/IsToExecute";
import { IsToExecuteCyclic, IsToExecuteFirstTime } from "../businessLogic/IsToExecuteCyclic";
import { CloseStartOperation } from "../businessLogic/plugIn/CloseOperation";
import { OperationStatus } from "../businessLogic/plugIn/OperationStatus";

export class CheckCyclicAction implements OperationStatus, CloseStartOperation {
    private readonly readCommand : string = 
`SELECT *
FROM OperationLastExecution
WHERE Name= $name`
private readonly insertCommand : string = 
`INSERT INTO OperationLastExecution(
	Name,
	LastExecution,
	InExecution,
	ExecutionStarted,
	SchedulerInCharge)
VALUES ($name, $lastExecution, 1, $executionStarted, $scheduler)` 
private readonly startCommand : string = 
`UPDATE OperationLastExecution
SET InExecution = 1, ExecutionStarted = $startingTime, SchedulerInCharge = $scheduler
WHERE Name= $name` 
        
    constructor(private db: string, private schedureId: number){}
    
    Start(operationName: string, date: Date, schedulerId: number): Promise<void> {
        var db = this.OpenConnection()
        return new Promise((resolve, reject) => {
            db.all(this.startCommand, 
                   { $name: operationName, $startingTime : date.toString(), $scheduler : schedulerId}, 
                   (err:any) => {                
         
                            if (err) {      
                                db.close()
                                reject(err)
                            } 
                            else {
                                db.close()
                                resolve(undefined)
                            }
                        })
            })        
    }

    read(name: string): Promise<IsToExecute> {
        var db = this.OpenConnection()
        return new Promise((resolve, reject) => {
            db.all(this.readCommand, { $name: name}, (err:any, rows:{ [key: string]: string|number; }[]) => {                
                if (err) {      
                    db.close()
                    reject(err)
                } 
                else if (rows.length===0) {
                    db.close()
                    resolve(new IsToExecuteFirstTime(name, this.schedureId, this))                                    
                }
                else {
                    db.close()
                    resolve( new IsToExecuteCyclic(name, new Date(rows[0].LastExecution), rows[0].InExecution===1, this.schedureId, this))
                }
            })
        })
    }
    
    close(operationName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    Create(operationName: string, date: Date, schedulerId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    private OpenConnection() {
        const sqlite3 = require('sqlite3').verbose()
        return new sqlite3.Database(this.db)
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