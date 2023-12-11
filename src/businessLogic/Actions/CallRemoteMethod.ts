import { Action } from './Action';

export enum RemoteCallResult {//For testing https://jsonplaceholder.typicode.com/
    Success,
    Failure
}

export abstract class CallRemoteMethod implements Action{
    protected abstract callMethod() : Promise<RemoteCallResult>
    
    async execute(): Promise<{ [key: string]: string; }> {
        try {
            return await this.tryExecute();
        }
        catch(e){
            return { 'Name': 'CallRemoteMethod', 'Status': 'Failure' }
        }
    }

    private async tryExecute() : Promise<{ [key: string]: string; }> {
        const response = await this.callMethod();
        return (response === RemoteCallResult.Success)  ? { 'Name': 'CallRemoteMethod', 'Status': 'Completed' }
                                                        : { 'Name': 'CallRemoteMethod', 'Status': 'Failure' };
    }
}
    // //for reference https://www.npmjs.com/package//axios
//For testing https://jsonplaceholder.typicode.com/
