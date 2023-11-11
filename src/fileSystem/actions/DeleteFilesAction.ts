import { DeleteAction } from "../../businessLogic/Actions/DeleteAction";
import { BaseFilesystemCommands } from "./BaseFileSystemCommands";

export class DeleteFilesAction extends DeleteAction{
    private commonCommands: BaseFilesystemCommands
    
    constructor(private folder:string, subNamePart:string){
        super(subNamePart) 
        this.commonCommands = new BaseFilesystemCommands()
    }
    
    protected async readAllEntities(): Promise<string[]> {
        return await this.commonCommands.readAllFiles(this.folder)
        
    }    

    protected async deleteEntity(f: string): Promise<undefined> {
        await this.commonCommands.deleteFile(this.folder + f)        
    }
}