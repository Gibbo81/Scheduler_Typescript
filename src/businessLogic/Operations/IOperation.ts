

export interface IOperation{
    CheckAndExecute(): Promise<boolean>
}