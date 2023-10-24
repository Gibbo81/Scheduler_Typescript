import { Action } from "./Action";
import fs from "fs/promises";

export class DeleteFileAction implements Action{

    constructor(protected folder:string, private subNamePart:string){}
   
    async execute(): Promise<{ [key: string]: string; }> {
        var files = await this.readAllfiles() 
        files = this.applyFilter(files);
        for (var f of files.map(fileName => this.folder + fileName))
            await this.deleteFile(f)
        return {'DeleteFileAction' : 'Completed'}
    }

    protected async deleteFile(f: string): Promise<undefined> {
        await fs.unlink(f);
    }

    protected async readAllfiles(): Promise<string[]> {
        return await fs.readdir(this.folder);
    }

    private applyFilter(files: string[]) {
        if (this.subNamePart)
            files = files.filter(f => f.includes(this.subNamePart));
        return files;
    }
}