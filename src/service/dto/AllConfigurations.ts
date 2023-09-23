import { CyclicOperation } from "../../businessLogic/Operations/CyclicOperation";
import { FixedConfiguratrion } from "./FixedConfiguratrion";

export class AllConfiguration{
  constructor(public cyclic : CyclicOperation[], public fixed : FixedConfiguratrion[] ){}
}