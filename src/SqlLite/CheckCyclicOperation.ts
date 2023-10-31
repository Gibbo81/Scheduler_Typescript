import { IsToExecute } from "../businessLogic/IsToExecute";
import { IsToExecuteCyclic, IsToExecuteFirstTime } from "../businessLogic/IsToExecuteCyclic";
import { CloseStartOperation } from "../businessLogic/plugIn/CloseOperation";
import { OperationStatus } from "../businessLogic/plugIn/OperationStatus";

export class CheckCyclicOperation implements OperationStatus, CloseStartOperation {
    private readonly readCommand : string = 
`SELECT *
FROM OperationLastExecution
WHERE Name= $name`
private readonly insertCommand : string = 
`INSERT INTO OperationLastExecution(
	Name,
	InExecution,
	ExecutionStarted,
	SchedulerInCharge)
VALUES ($name, 1, $executionStarted, $scheduler)` 
private readonly startCommand : string = 
`UPDATE OperationLastExecution
SET InExecution = 1, ExecutionStarted = $startingTime, SchedulerInCharge = $scheduler
WHERE Name= $name and InExecution = 0` 
private readonly completeCommand : string = 
`UPDATE OperationLastExecution
SET InExecution = 0, LastExecution = $endingTime, SchedulerInCharge = NULL
WHERE Name= $name` 
        
    constructor(private db: string, private schedureId: number){}
    
    start(operationName: string, date: Date, schedulerId: number): Promise<boolean> {
        var db = this.OpenConnection()       
          return new Promise((resolve, reject) => {
            db.run(this.startCommand, 
                   { $name: operationName, $startingTime : date.toString(), $scheduler : schedulerId}, 
                   function(err) {
                        if (err) {      
                            db.close()
                            reject(err)
                        } 
                        else {
                            db.close()
                            var result = (this.changes>0) 
                            resolve(result)
                        }
                   }
            )}   
        )
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
    
    close(operationName: string, date: Date): Promise<void> {
        var db = this.OpenConnection()
        return new Promise((resolve, reject) => {
            db.run(this.completeCommand, 
                   { $name: operationName, $endingTime : date.toString()}, 
                   function(err) {
                    if (err) {      
                        db.close()
                        reject(err)
                    } 
                    else {
                        db.close()
                        resolve()
                    }
               })
        })
    }

    create(operationName: string, date: Date, schedulerId: number): Promise<void> {
        var db = this.OpenConnection()
        return new Promise((resolve, reject) => {
            db.run(this.insertCommand, 
                   { $name: operationName, $executionStarted : date.toString(), $scheduler : schedulerId}, 
                   function(err) {
                    if (err) {      
                        db.close()
                        reject(err)
                    } 
                    else {
                        db.close()
                        resolve()
                    }
               })
        })
    }

    private OpenConnection() {
        const sqlite3 = require('sqlite3').verbose()
        return new sqlite3.Database(this.db)
    }
}