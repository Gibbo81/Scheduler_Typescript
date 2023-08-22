export class FixedConfiguratrion{
  public ExecutionTimes : string[]
  public MaxDelta : number
  public ExcludedWeekDays : number[]
  public ExcludedYearDays : string[]
  public Actions : {[key:string]:string}[]
  public Parallel : boolean
}
