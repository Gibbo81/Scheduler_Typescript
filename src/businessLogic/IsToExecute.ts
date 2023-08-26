export interface IsToExecute{
    check(interval: number) : boolean
    complete() : Promise<void>
}