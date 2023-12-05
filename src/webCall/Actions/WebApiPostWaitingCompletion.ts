import axios from 'axios';
import { CallRemoteMethod, RemoteCallResult } from '../../businessLogic/Actions/CallRemoteMethod';


export class WebApiPostWaitingCompletion extends CallRemoteMethod{    
    constructor(private route: string, private body: string) {
        super()
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