import { IsToExecute } from "./IsToExecute";

export class IsToExecuteCyclic implements IsToExecute{
    check(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    complete(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}