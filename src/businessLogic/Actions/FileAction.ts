import { Action } from "./Action";
import fs from "fs/promises";
//TODO: working on this action

export class FileAction implements Action{ //TODO: maybe is the base class not necessary?
    

    
    execute(): Promise<{ [key: string]: string; }> {
        throw new Error("Method not implemented.");
    }

}

export class DeleteFileAction implements Action{

    constructor(private folder:string, private subName:string){}
   
    async execute(): Promise<{ [key: string]: string; }> {
        var files = (await fs.readdir(this.folder)) //TODO:: unit test with two protected method?
        files = this.ApplyFilter(files);
        for (var f of files.map(fileName => this.folder + fileName))
            await fs.unlink(f)
        return {'DeleteFileAction' : 'Completed'}
    }

    private ApplyFilter(files: string[]) {
        if (this.subName)
            files = files.filter(f => f.includes(this.subName));
        return files;
    }
}