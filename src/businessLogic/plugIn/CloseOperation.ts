
export interface CloseStartOperation {
    close(operationName: string): Promise<void>;
    Start(operationName: string, date: Date, schedulerId: number): Promise<void>
    Create(operationName: string, date: Date, schedulerId: number): Promise<void>
}
