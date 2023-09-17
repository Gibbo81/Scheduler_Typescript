
export interface CloseOperation {
    close(operationName: string): Promise<void>;
    Start(operationName: string, date: Date, schedulerId: number): Promise<void>;
}
