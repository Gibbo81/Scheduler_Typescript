import { Action } from "./Action";
import fs from "fs/promises";
import { BaseFiles } from "./BaseFiles";

export class DeleteFilesAction extends BaseFiles implements Action{

    constructor(protected folder:string, private subNamePart:string){ super() }
   
    async execute(): Promise<{ [key: string]: string; }> {
        var files = await this.readAllfiles(this.folder) 
        files = this.applyFilter(files, this.subNamePart);
        for (var f of files.map(fileName => this.folder + fileName))
            await this.deleteFile(f)
        return {'DeleteFileAction' : 'Completed'}
    }

    protected async deleteFile(f: string): Promise<undefined> {
        await fs.unlink(f);
    }
}