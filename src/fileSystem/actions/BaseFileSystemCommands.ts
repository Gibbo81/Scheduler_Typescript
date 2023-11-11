import fs from "fs/promises";
import { Dirent } from "node:fs";

export class BaseFilesystemCommands {

    public async readAllFiles(folder : string): Promise<string[]> {
        var list = await fs.readdir(folder, { withFileTypes: true })
        return list.filter(x => x.isFile()).map(y => y.name);
    } 

    public async deleteFile(fullFileName: string): Promise<undefined> {
        await fs.unlink(fullFileName);
    }

    public async moveEntities(files: string[], startingFolder: string, destinationFolder: string): Promise<void> {
        for (var f of files)
            await fs.rename(startingFolder + f, destinationFolder + f);
    }  
}