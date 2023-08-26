
export interface CloseOperation {
    close(operationName: string): Promise<void>;
}
