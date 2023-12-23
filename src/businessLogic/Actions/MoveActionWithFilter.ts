import { Action } from "./Action";

export abstract class MoveActionWithFilter implements Action {
    constructor(private subNamePart: string) { }

    protected abstract readAllEntities(): Promise<string[]> 
    protected abstract moveEntities(entities: string[]): Promise<void>

    async execute(): Promise<{ [key: string]: string; }> {
        try{
            return await this.tryExecute();
        }
        catch(e){
            return { 'Name': 'MoveEntitiesAction', 'Status': 'Failure' }
        }        
    }

    private async tryExecute() {
        var entities = await this.readAllEntities();
        entities = entities.filter(f => f.includes(this.subNamePart));
        await this.moveEntities(entities);
        return { 'Name': 'MoveEntitiesAction', 'Status': 'Completed' };
    }
}