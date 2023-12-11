import axios from 'axios';
import { CallRemoteMethod, RemoteCallResult } from '../../businessLogic/Actions/CallRemoteMethod';


export class WebApiPostWaitingCompletion extends CallRemoteMethod{    
    private readonly body : string

    constructor(private route: string, body: object) {
        super()
        this.body = JSON.stringify(body)
    }
        
    protected async callMethod(): Promise<RemoteCallResult> {      
        const response = await axios.post(this.route, this.body);
        return (this.isSuccess(response))   ? RemoteCallResult.Success
                                            : RemoteCallResult.Failure
    }

    private isSuccess(response) {
        return response.status === 201 || response.status === 200;
    }
}