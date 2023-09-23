import { CheckCyclicAction } from "../../SqlLite/CheckCyclicAction";
import { CyclingConfiguratrion } from "../../service/dto/CyclingConfiguratrion";
import { CyclicOperation } from "./CyclicOperation";




export class CyclicOperationFactory {
    constructor(private db: string, private schedureId: number) { }

    build(configuration: CyclingConfiguratrion): CyclicOperation {
        return new CyclicOperation(configuration.CyclingTime, 
                                   configuration.OperationName,
                                   this.schedureId,
                                   new CheckCyclicAction(this.db, this.schedureId), 
                                   []); //TODO: missing actions factory
    }
}
