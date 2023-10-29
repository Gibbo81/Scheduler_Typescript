
export interface CloseStartOperation {
    close(operationName: string): Promise<void>;
    start(operationName: string, date: Date, schedulerId: number): Promise<boolean>
    Create(operationName: string, date: Date, schedulerId: number): Promise<void>
}
