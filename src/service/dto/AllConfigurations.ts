import { CyclicOperationBase } from "../../businessLogic/Operations/CyclicOperation";
import { FixedConfiguratrion } from "./FixedConfiguratrion";

export class AllConfiguration{
  constructor(public cyclic : CyclicOperationBase[], public fixed : FixedConfiguratrion[] ){}
}