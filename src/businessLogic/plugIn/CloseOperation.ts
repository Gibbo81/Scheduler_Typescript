
export interface CloseStartOperation {
    close(operationName: string, date: Date): Promise<void>;
    start(operationName: string, date: Date, schedulerId: number): Promise<boolean>
    create(operationName: string, date: Date, schedulerId: number): Promise<void>
}
