import { Action } from './Action';

export enum RemoteCallResult {
    Success,
    Failure
}

export abstract class CallRemoteMethod implements Action{
    protected abstract callMethod() : Promise<RemoteCallResult>
    
    async execute(): Promise<{ [key: string]: string; }> {
        const response = await this.callMethod();
        return (response === RemoteCallResult.Success) ?  { 'Name': 'CallRemoteMethod', 'Status': 'Completed' }
                                                       :  { 'Name': 'CallRemoteMethod', 'Status': 'Failure' }
    }
}