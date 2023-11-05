import { Action } from "../businessLogic/Actions/Action";
import { DeleteFilesAction } from "../fileSystem/actions/DeleteFilesAction";
import { MoveFilesActionWithFilter } from "../fileSystem/actions/MoveFileActionWithFilter";
import { MoveFilesActionWithoutFilter } from "../fileSystem/actions/MoveFilesActionWithoutFilter";

export class ActionFactory{

    public create(conf :{[key:string]:string}) : Action{
        this.checkName(conf);
        switch(conf.name.toLowerCase()){
            case "deletefiles":
                return this.createDeletefilesAction(conf);
            case "movefiles":
                return this.createMoveFileAction(conf)
        }
        

        return undefined;
    }

    private createDeletefilesAction(conf: { [key: string]: string; }): Action {
        this.CheckParametersForDeleteAction(conf);
        var subNamePart = (conf.subNamePart) ? conf.subNamePart : null;
        return new DeleteFilesAction(conf.folder, subNamePart);
    }

    createMoveFileAction(conf: { [key: string]: string; }): Action {
        this.CheckParametersForMoveAction(conf);
        return (conf.subNamePart) ? new MoveFilesActionWithFilter(conf.folder, conf.destinationFolder, conf.subNamePart)
                                  : new MoveFilesActionWithoutFilter(conf.folder, conf.destinationFolder)
    }

    private CheckParametersForDeleteAction(conf: { [key: string]: string; }) {
        if (!conf.folder)
            throw new Error("Action deletefile is missing working folder.");
    }

    private CheckParametersForMoveAction(conf: { [key: string]: string; }) {
        if (!conf.folder)
            throw new Error("Action movefile is missing starting folder.");
        if (!conf.destinationFolder)
            throw new Error("Action movefile is missing destination folder.");
    }

    private checkName(conf: { [key: string]: string; }) {
        if (!conf.name)
            throw new Error("Action name is missing.");
    }
}