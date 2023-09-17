export interface IsToExecute{
    check(interval: number) : boolean
    complete(ownerId: string) : Promise<void>
    start(ownerId: string): Promise<void>
}