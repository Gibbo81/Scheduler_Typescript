import { IsToExecute } from "../businessLogic/plugIn/IsToExecute";

export class CheckAction implements IsToExecute{
    
    
    check(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}