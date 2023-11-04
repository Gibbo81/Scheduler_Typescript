import { MoveActionWithFilter } from "../../businessLogic/Actions/MoveActionWithFilter";
import fs from "fs/promises";

export class MoveFilesActionWithFilter extends MoveActionWithFilter{
    constructor(private startingFolder: string, private destinationFolder: string, subNamePart: string) 
    { 
        super(subNamePart)     
    }

    protected async readAllEntities(): Promise<string[]> {
        var list = await fs.readdir(this.startingFolder, { withFileTypes: true });
        return list.filter(x => x.isFile()).map(y => y.name);
    }
    protected async moveEntities(files: string[]): Promise<void> {
        for (var f of files)
            await fs.rename(this.startingFolder + f, this.destinationFolder + f);
    }    
}