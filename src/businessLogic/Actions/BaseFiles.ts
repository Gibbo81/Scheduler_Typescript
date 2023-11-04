import fs from "fs/promises";

export abstract class BaseFiles {
    
    protected async readAllfiles(folder: string): Promise<string[]> {
        var list = await fs.readdir(folder, { withFileTypes: true });
        return list.filter(x => x.isFile()).map(y => y.name);
    }

    protected async moveFiles(files: string[], startingFolder: string, destinationFolder: string): Promise<void> {
        for (var f of files)
            await this.moveFile(startingFolder, f, destinationFolder);
    }

    protected async moveFile(startingFolder: string, f: string, destinationFolder: string) : Promise<void> {
        await fs.rename(startingFolder + f, destinationFolder + f);
    }
}