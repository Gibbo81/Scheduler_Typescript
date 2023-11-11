import { MoveActionWithoutFilter } from "../../businessLogic/Actions/MoveActionWithoutFilter";
import { BaseFilesystemCommands } from "./BaseFileSystemCommands";

export class MoveFilesActionWithoutFilter extends MoveActionWithoutFilter{
    private commonCommands: BaseFilesystemCommands

    constructor(private startingFolder:string, private destinationFolder:string) {
        super()
        this.commonCommands = new BaseFilesystemCommands()
    }
    
    protected async readAllEntities(): Promise<string[]> {
        return await this.commonCommands.readAllFiles(this.startingFolder)
    }
    protected async moveEntities(files: string[]): Promise<void> {
        await this.commonCommands.moveEntities(files, this.startingFolder, this.destinationFolder)
    }       
}