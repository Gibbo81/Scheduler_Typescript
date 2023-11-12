import { RenameActions } from "../../businessLogic/Actions/RenameAction";
import { BaseFilesystemCommands } from "./BaseFileSystemCommands";
import fs from "fs/promises";

export class RenameFilesAction extends RenameActions{    
    private commonCommands: BaseFilesystemCommands

    constructor(private folder: string, search: string, substitute: string) { 
        super(search, substitute)     
        this.commonCommands= new BaseFilesystemCommands()
    }

    protected async readAllEntities(): Promise<string[]> {
        return await this.commonCommands.readAllFiles(this.folder);
    }

    protected async renameEntity(oldName: string, newName: string): Promise<void> {
        await fs.rename(this.folder+oldName, this.folder+newName)                
    }
}