import { Action } from "./Action"

export abstract class DeleteAction implements Action{
    constructor(private subNamePart:string){  }

    protected abstract readAllEntities(): Promise<string[]>
    protected abstract deleteEntity(f: string): Promise<undefined> 

    async execute(): Promise<{ [key: string]: string; }> {
        var entities = await this.readAllEntities()
        entities = this.applyFilter(entities, this.subNamePart);
        for (var f of entities) 
            await this.deleteEntity(f)
        return {'DeleteAction' : 'Completed'}
    }

    protected applyFilter(files: string[], subNamePart: string) {
        if (subNamePart)
            files = files.filter(f => f.includes(subNamePart));
        return files;
    }
}