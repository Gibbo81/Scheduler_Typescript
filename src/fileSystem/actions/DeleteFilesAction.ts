import { DeleteAction } from "../../businessLogic/Actions/DeleteAction";
import fs from "fs/promises";

export class DeleteFilesAction extends DeleteAction{
    constructor(private folder:string, subNamePart:string){ super(subNamePart) }
    
    protected async readAllEntities(): Promise<string[]> {
        var list = await fs.readdir(this.folder, { withFileTypes: true });
        return list.filter(x => x.isFile()).map(y => y.name);
    }    

    protected async deleteEntity(f: string): Promise<undefined> {
        await fs.unlink(this.folder + f);
    }
}