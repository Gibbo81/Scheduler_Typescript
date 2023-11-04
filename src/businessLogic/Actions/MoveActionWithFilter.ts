import { Action } from "./Action";

export abstract class MoveActionWithFilter implements Action {
    constructor(private subNamePart: string) { }

    protected abstract readAllEntities(): Promise<string[]> 
    protected abstract moveEntities(entities: string[]): Promise<void>

    async execute(): Promise<{ [key: string]: string; }> {
        var files = await this.readAllEntities();        
        files = files.filter(f => f.includes(this.subNamePart));
        await this.moveEntities(files);
        return { 'MoveEntitiesAction': 'Completed' };
    }
}
