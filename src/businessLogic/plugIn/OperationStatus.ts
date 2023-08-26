import { IsToExecute } from "../IsToExecute";

export interface OperationStatus{
    read(name: string): Promise<IsToExecute | undefined>
}

