import { Action } from "../businessLogic/Actions/Action";
import { DeleteFilesAction } from "../fileSystem/actions/DeleteFilesAction";

export class ActionFactory{

    public create(conf :{[key:string]:string}) : Action{
        this.checkName(conf);
        switch(conf.name.toLowerCase()){
            case "deletefile":
                return this.createDeletefilesAction(conf);
        }
        

        return undefined;
    }

    private createDeletefilesAction(conf: { [key: string]: string; }) {
        if (!conf.folder)
            throw new Error("Action deletefile is missing folder.");
        var subNamePart = (conf.subNamePart) ? conf.subNamePart : null;
        return new DeleteFilesAction(conf.folder, subNamePart);
    }

    private checkName(conf: { [key: string]: string; }) {
        if (!conf.name)
            throw new Error("Action name is missing.");
    }
}