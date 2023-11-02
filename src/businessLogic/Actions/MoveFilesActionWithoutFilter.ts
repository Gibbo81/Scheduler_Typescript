import { Action } from "./Action";
import { BaseFiles } from "./BaseFiles";

export class MoveFilesActionWithoutFilter extends BaseFiles implements Action{
    constructor(private startingFolder:string, private destinationFolder:string) {super()}

    async execute(): Promise<{ [key: string]: string; }> {
        var files = await this.readAllfiles(this.startingFolder)
        await this.moveFiles(files, this.startingFolder, this.destinationFolder)
        return {'MoveFilesAction' : 'Completed'}
    }
}

