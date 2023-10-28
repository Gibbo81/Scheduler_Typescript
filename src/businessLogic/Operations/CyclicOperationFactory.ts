import { CheckCyclicOperation } from "../../SqlLite/CheckCyclicOperation";
import { CyclingConfiguratrion } from "../../service/dto/CyclingConfiguratrion";
import { ActionFactory } from "../Actions/ActionFactory";
import { CyclicOperation } from "./CyclicOperation";


export class CyclicOperationFactory {
    constructor(private dbConnectionString: string, private schedureId: number, private actionFactory: ActionFactory) { }

    build(configuration: CyclingConfiguratrion): CyclicOperation {
        return new CyclicOperation(configuration.CyclingTime, 
                                   configuration.OperationName,
                                   this.schedureId,
                                   new CheckCyclicOperation(this.dbConnectionString, this.schedureId), 
                                   configuration.Actions.map(a => this.actionFactory.create(a))); 
    }
}
