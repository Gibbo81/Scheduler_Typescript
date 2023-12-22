import { Action } from "../businessLogic/Actions/Action";
import { CallAnExecutableFireAndForgetFromFileSystem } from "../fileSystem/actions/CallAnExecutableFireAndForgetFromFileSystem";
import { CallAnExecutableWaitingCompletionFromFileSystem } from "../fileSystem/actions/CallAnExecutableWaitingCompletionFromFileSystem";
import { DeleteFilesAction } from "../fileSystem/actions/DeleteFilesAction";
import { MoveFilesActionWithFilter } from "../fileSystem/actions/MoveFileActionWithFilter";
import { MoveFilesActionWithoutFilter } from "../fileSystem/actions/MoveFilesActionWithoutFilter";
import { RenameFilesAction } from "../fileSystem/actions/RenameFilesAction";
import { WebApiGetWaitingCompletion } from "../webCall/Actions/WebApiGetWaitingCompletion";
import { WebApiGetFireAndForget } from "../webCall/Actions/WebApiGetFireAndForget";
import { WebApiPostWaitingCompletion } from "../webCall/Actions/WebApiPostWaitingCompletion";
import { WebApiPostFireAndForget } from "../webCall/Actions/WebApiPostFireAndForget";
import { WebApiDeleteWaitingCompletition } from "../webCall/Actions/WebApiDeleteWaitingCompletition";
import { WebApiDeleteFireAndForget } from "../webCall/Actions/WebApiDeleteFireAndForget";
import { ExecuteScript } from "../SqlLite/Action/ExecuteScript";

export class ActionFactory{
    private readonly trueStringValue: string='true'

    public create(conf :{[key:string]:string}) : Action{
        this.checkName(conf);
        switch(conf.name.toLowerCase()){
            case "deletefiles":
                return this.createDeletefilesAction(conf);
            case "movefiles":
                return this.createMoveFileAction(conf)
            case "renamefiles":
                return this.createRenameFileAction(conf)
            case "callexe":
                return this.createCallEexcutableAction(conf)
            case "callremotemethod":
                return this.createCallRemoteMethodAction(conf)
            case "executesqlightscript":
                return this.createExecuteScriptAction(conf)
        }
        throw new Error(`Unrecognized Action: ${conf.name}`);
    }

    private createExecuteScriptAction(conf: { [key: string]: string; }): Action {
        this.CheckParametersForExecuteSQLightAction(conf);
        return new ExecuteScript(conf.db, conf.script)
    }

    private createCallRemoteMethodAction(conf: { [key: string]: string; }): Action {
        this.CheckParametersForCallRemoteMethodAction(conf);
        if (conf.fireandforget === this.trueStringValue)
            return this.createRemoteMethodFireAndForget(conf)        
        else
            return this.createRemoteMethodWaitingCompletion(conf)
        
    }

    private createRemoteMethodWaitingCompletion(conf: { [key: string]: string; }) {
        switch (conf.verb.toLowerCase()) {
            case "get":
                return new WebApiGetWaitingCompletion(conf.route);
            case "post":
                return new WebApiPostWaitingCompletion(conf.route, this.prepareParametersForRemoteCallAction(conf));
            case "delete":
                return new WebApiDeleteWaitingCompletition(conf.route);
        }
        throw new Error(`Unrecognized WebMethod verb: ${conf.verb}`);
    }

    private createRemoteMethodFireAndForget(conf: { [key: string]: string; }) {
        switch (conf.verb.toLowerCase()) {
            case "get":
                return new WebApiGetFireAndForget(conf.route);
            case "post":
                return new WebApiPostFireAndForget(conf.route, this.prepareParametersForRemoteCallAction(conf));
            case "delete":
                return new WebApiDeleteFireAndForget(conf.route);
        }
        throw new Error(`Unrecognized WebMethod verb: ${conf.verb}`);
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
        var parameter = this.prepareParametersForExeAction(conf);        
        return (conf.fireandforget === this.trueStringValue) ?
            new CallAnExecutableFireAndForgetFromFileSystem(conf.exepath, parameter) :
            new CallAnExecutableWaitingCompletionFromFileSystem(conf.exepath, parameter)
    }

    private CheckParametersForCallRemoteMethodAction(conf: { [key: string]: string; }) {
        if (!conf.verb)
            throw new Error("Action call remote method is missing the verb.");
        if (!conf.route)
            throw new Error("Action call remote method is missing the route.");
    }

    private CheckParametersForExecuteSQLightAction(conf: { [key: string]: string; }) {
        if (!conf.script)
            throw new Error("Action executesqlightscript is missing the script command.");
        if (!conf.db)
            throw new Error("Action executesqlightscript is missing the DB.");
    }

    private prepareParametersForExeAction(conf: { [key: string]: string; }) :{ [key: string]: string; }{
        var parameter: { [key: string]: string; } = {};
        for (var key in conf)
            if (this.isAParameterForTheExecutable(key))
                parameter[key] = conf[key];
        return parameter;
    }

    private isAParameterForTheExecutable(key: string) : boolean {
        return key !== 'exepath' && key !== 'fireandforget' && key !== 'name';
    }

    private prepareParametersForRemoteCallAction(conf: { [key: string]: string; }) :object{
        var parameter: object = {};
        for (var key in conf)
            if (this.isAParameterForTheRemoteCall(key))
                parameter[key] = conf[key];
        return parameter;
    }

    private isAParameterForTheRemoteCall(key: string) : boolean {
        return key !== 'route' && key !== 'verb' && key !== 'name' && key !== 'fireandforget';
    }

    private CheckParametersForCallExecutableAction(conf: { [key: string]: string; }) {
        if (!conf.exepath)
            throw new Error("Action call executable is missing exe path.");
        if (!conf.exepath.endsWith(".exe"))
            throw new Error("Action call executable has an executable path that do not end in '.exe'.");
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