export class FixedConfiguratrion{
    public OperationName : string
    public ExecutionTimes : string[]
    public MaxDelta : number
    public ExcludedWeekDays : number[]
    public ExcludedYearDays : string[]
    public Actions : {[key:string]:string}[]
    public Parallel : boolean
}
