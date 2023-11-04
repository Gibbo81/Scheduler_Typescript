import { MoveActionWithoutFilter } from "../../businessLogic/Actions/MoveActionWithoutFilter";
import fs from "fs/promises";

export class MoveFilesActionWithoutFilter extends MoveActionWithoutFilter{
    constructor(private startingFolder:string, private destinationFolder:string) {super()}
    
    protected async readAllEntities(): Promise<string[]> {
        var list = await fs.readdir(this.startingFolder, { withFileTypes: true });
        return list.filter(x => x.isFile()).map(y => y.name);
    }
    protected async moveEntities(files: string[]): Promise<void> {
        for (var f of files)
            await fs.rename(this.startingFolder + f, this.destinationFolder + f);
    }       
}