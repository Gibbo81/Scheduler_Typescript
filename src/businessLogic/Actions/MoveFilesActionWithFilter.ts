import { Action } from "./Action";
import { BaseFiles } from "./BaseFiles";

export class MoveFilesActionWithFilter extends BaseFiles implements Action {
    constructor(private startingFolder: string, private destinationFolder: string, private subNamePart: string) { super(); }

    async execute(): Promise<{ [key: string]: string; }> {
        var files = await this.readAllfiles(this.startingFolder);        
        files = files.filter(f => f.includes(this.subNamePart));
        await this.moveFiles(files, this.startingFolder, this.destinationFolder);
        return { 'MoveFilesAction': 'Completed' };
    }
}
