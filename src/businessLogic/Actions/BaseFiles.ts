import fs from "fs/promises";

export abstract class BaseFiles {
    
    protected async readAllfiles(folder: string): Promise<string[]> {
        var list = await fs.readdir(folder, { withFileTypes: true });
        return list.filter(x => x.isFile()).map(y => y.name);
    }

    protected applyFilter(files: string[], subNamePart: string) {
        if (subNamePart)
            files = files.filter(f => f.includes(subNamePart));
        return files;
    }

    protected async moveFiles(files: string[], startingFolder: string, destinationFolder: string) {
        for (var f of files)
            await fs.rename(startingFolder + f, destinationFolder + f);
    }
}