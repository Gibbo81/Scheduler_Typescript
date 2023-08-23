import { CyclingConfiguratrion } from "./CyclingConfiguratrion";
import { FixedConfiguratrion } from "./FixedConfiguratrion";

export class AllConfiguration{
  constructor(public cyclic : CyclingConfiguratrion[], public fixed : FixedConfiguratrion[] ){}
}