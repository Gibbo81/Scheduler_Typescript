import { Action } from "./Action";

export abstract class MoveActionWithoutFilter implements Action{    

    protected abstract readAllEntities(): Promise<string[]> 
    protected abstract moveEntities(entities: string[]): Promise<void>

    async execute(): Promise<{ [key: string]: string; }> {
        try{
            return await this.tryExecute();
        }
        catch(e){
            return { 'Name': 'MoveEntitiesActionWithoutFilter', 'Status': 'Failure' }    
        }        
    }

    private async tryExecute() {
        var files = await this.readAllEntities();
        await this.moveEntities(files);
        return { 'Name': 'MoveEntitiesActionWithoutFilter', 'Status': 'Completed' };
    }
}

