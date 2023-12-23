import { Action } from "./Action"

export abstract class RenameActions implements Action{
    constructor(private search: string, private substitute: string) { }
    
    protected abstract readAllEntities(): Promise<string[]> 
    protected abstract renameEntity(oldName: string, newName:string): Promise<void>    
    
    async execute(): Promise<{ [key: string]: string; }> {
        try{
            return await this.tryExecute();
        }
        catch{
            return { 'Name': 'RenameActions', 'Status': 'Failure' }    
        }        
    }

    private async tryExecute() {
        var entities = await this.readAllEntities();
        var toRename = entities.filter(f => f.includes(this.search));
        for (var e of toRename)
            await this.renameEntity(e, e.replace(this.search, this.substitute));
        return { 'Name': 'RenameActions', 'Status': 'Completed' };
    }
} 