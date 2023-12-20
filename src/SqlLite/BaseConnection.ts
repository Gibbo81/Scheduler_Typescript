

export abstract class BaseConnection{
    constructor(private db: string){}
    
    protected OpenConnection() {
        const sqlite3 = require('sqlite3').verbose()
        return new sqlite3.Database(this.db)
    }
}