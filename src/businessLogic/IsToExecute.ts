export interface IsToExecute{
    check() : Promise<boolean>
    complete() : Promise<void>
}