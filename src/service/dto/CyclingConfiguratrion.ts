export class CyclingConfiguratrion{
    public OperationName : string
    public CyclingTime : number
    public Actions : {[key:string]:string}[]
    public Parallel : boolean
    public OnErrorGoOn : boolean
}