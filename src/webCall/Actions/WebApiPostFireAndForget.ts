import axios from 'axios';
import { CallRemoteMethod, RemoteCallResult } from '../../businessLogic/Actions/CallRemoteMethod';

export class WebApiPostFireAndForget extends CallRemoteMethod{    
    private readonly body : string
    
    constructor(private route: string, parameters: object) {
        super()
        this.body = JSON.stringify(parameters)
    }
        
    protected async callMethod(): Promise<RemoteCallResult> {      
        axios.post(this.route, this.body);
        return RemoteCallResult.Success;
    }
}