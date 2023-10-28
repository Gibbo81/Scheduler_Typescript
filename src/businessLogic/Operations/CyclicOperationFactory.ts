import { CheckCyclicOperation } from "../../SqlLite/CheckCyclicOperation";
import { CyclingConfiguratrion } from "../../service/dto/CyclingConfiguratrion";
import { ActionFactory } from "../Actions/ActionFactory";
import { CyclicOperation } from "./CyclicOperation";


export class CyclicOperationFactory {
    constructor(private dbConnectionString: string, private schedureId: number, private actionFactory: ActionFactory) { }

    build(configuration: CyclingConfiguratrion): CyclicOperation {
        this.CheckConfiguration(configuration);
        return new CyclicOperation(configuration.CyclingTime, 
                                   configuration.OperationName,
                                   this.schedureId,
                                   new CheckCyclicOperation(this.dbConnectionString, this.schedureId), 
                                   configuration.Actions.map(a => this.actionFactory.create(a))); 
    }

    private CheckConfiguration(configuration: CyclingConfiguratrion) {
        if (!configuration.OperationName)
            throw new Error("Invalid operation name");
        if (!configuration.CyclingTime)
            throw new Error(`Invalid Cyclictime for operation: ${configuration.OperationName}`);
        if (!configuration.Actions)
            throw new Error(`Null action's list for operation: ${configuration.OperationName}`);
        if (configuration.Actions.length === 0)
            throw new Error(`Empty action's list for operation: ${configuration.OperationName}`);
    }
}
