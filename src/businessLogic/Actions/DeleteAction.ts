import { Action } from "./Action"

export abstract class DeleteAction implements Action{
    constructor(private subNamePart:string){  }

    protected abstract readAllEntities(): Promise<string[]>
    protected abstract deleteEntity(f: string): Promise<undefined> 

    async execute(): Promise<{ [key: string]: string; }> {
        var files = await this.readAllEntities()
        files = this.applyFilter(files, this.subNamePart);
        for (var f of files) 
            await this.deleteEntity(f)
        return {'DeleteAction' : 'Completed'}
    }

    protected applyFilter(files: string[], subNamePart: string) {
        if (subNamePart)
            files = files.filter(f => f.includes(subNamePart));
        return files;
    }
}