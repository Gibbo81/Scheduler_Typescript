import { MoveActionWithFilter } from "../../businessLogic/Actions/MoveActionWithFilter";
import { BaseFilesystemCommands } from "./BaseFileSystemCommands";

export class MoveFilesActionWithFilter extends MoveActionWithFilter{
    private commonCommands: BaseFilesystemCommands

    constructor(private startingFolder: string, private destinationFolder: string, subNamePart: string) { 
        super(subNamePart)     
        this.commonCommands= new BaseFilesystemCommands()
    }

    protected async readAllEntities(): Promise<string[]> {
        return await this.commonCommands.readAllFiles(this.startingFolder)
    }
    protected async moveEntities(files: string[]): Promise<void> {
        await this.commonCommands.moveEntities(files, this.startingFolder, this.destinationFolder)
    }    
}