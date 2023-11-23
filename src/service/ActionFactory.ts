import { Action } from "../businessLogic/Actions/Action";
import { CallAnExecutableFireAndForgetFromFileSystem } from "../fileSystem/actions/CallAnExecutableFireAndForgetFromFileSystem";
import { CallAnExecutableWaitingCompletionFromFileSystem } from "../fileSystem/actions/CallAnExecutableWaitingCompletionFromFileSystem";
import { DeleteFilesAction } from "../fileSystem/actions/DeleteFilesAction";
import { MoveFilesActionWithFilter } from "../fileSystem/actions/MoveFileActionWithFilter";
import { MoveFilesActionWithoutFilter } from "../fileSystem/actions/MoveFilesActionWithoutFilter";
import { RenameFilesAction } from "../fileSystem/actions/RenameFilesAction";

export class ActionFactory{

    public create(conf :{[key:string]:string}) : Action{
        this.checkName(conf);
        switch(conf.name.toLowerCase()){
            case "deletefiles":
                return this.createDeletefilesAction(conf);
            case "movefiles":
                return this.createMoveFileAction(conf)
            case "renamefiles":
                return this.createRenameFileAction(conf)
            case "callexe"://TODO: working on
                return this.createCallEexcutableAction(conf)
        }
        

        throw new Error("Unrecognized Action.");
    }

    private createCallExecutableFileAction(conf: { [key: string]: string; }): Action {
        this.CheckParametersForCallExecutableAction(conf);
        return new RenameFilesAction(conf.folder, conf.search, conf.substitute)        
    }

    private createRenameFileAction(conf: { [key: string]: string; }): Action {
        this.CheckParametersForRenameAction(conf);
        return new RenameFilesAction(conf.folder, conf.search, conf.substitute)        
    }

    private createDeletefilesAction(conf: { [key: string]: string; }): Action {
        this.CheckParametersForDeleteAction(conf);
        var subNamePart = (conf.subNamePart) ? conf.subNamePart : null;
        return new DeleteFilesAction(conf.folder, subNamePart);
    }

    private createMoveFileAction(conf: { [key: string]: string; }): Action {
        this.CheckParametersForMoveAction(conf);
        return (conf.subNamePart) ? new MoveFilesActionWithFilter(conf.folder, conf.destinationFolder, conf.subNamePart)
                                  : new MoveFilesActionWithoutFilter(conf.folder, conf.destinationFolder)
    }

    private createCallEexcutableAction(conf: { [key: string]: string; }): Action {
        this.CheckParametersForCallExecutableAction(conf);
        var parameter = this.preparePArametersForExeAction(conf);        
        return (conf.fireandforget === 'true') ?
            new CallAnExecutableFireAndForgetFromFileSystem(conf.exepath, parameter) :
            new CallAnExecutableWaitingCompletionFromFileSystem(conf.exepath, parameter)
    }

    private preparePArametersForExeAction(conf: { [key: string]: string; }) {
        var parameter: { [key: string]: string; } = {};
        for (var key in conf)
            if (this.isAnExeParameter(key))
                parameter.key = conf[key];
        return parameter;
    }

    private isAnExeParameter(key: string) {
        return key !== 'exepath' && key !== 'fireandforget';
    }

    private CheckParametersForCallExecutableAction(conf: { [key: string]: string; }) {
        if (!conf.exepath)
            throw new Error("Action call executable is missing exe path.");
        if (!conf.fireandforget)
            throw new Error("Action call executable is missing working mode.");
    }

    private CheckParametersForRenameAction(conf: { [key: string]: string; }) {
        if (!conf.folder)
            throw new Error("Action renamefile is missing starting folder.");
        if (!conf.search)
            throw new Error("Action renamefile is missing search pattern.");
        if (!conf.substitute)
            throw new Error("Action renamefile is missing substitute value.");
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