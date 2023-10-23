import { Action } from "./Action";
import fs from "fs/promises";
//TODO: working on this action

export class FileAction implements Action{ //TODO: maybe is the base class not necessary?
    

    
    execute(): Promise<{ [key: string]: string; }> {
        throw new Error("Method not implemented.");
    }

}

export class DeleteFileAction implements Action{

    constructor(protected folder:string, private subName:string){}
   
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
        if (this.subName)
            files = files.filter(f => f.includes(this.subName));
        return files;
    }
}