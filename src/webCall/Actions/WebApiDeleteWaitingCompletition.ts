import axios from 'axios';
import { CallRemoteMethod, RemoteCallResult } from '../../businessLogic/Actions/CallRemoteMethod';


export class WebApiDeleteWaitingCompletition extends CallRemoteMethod{
    constructor(private route: string) {
        super()
    }    
    
    protected async callMethod(): Promise<RemoteCallResult> {
        var result = await axios.delete(this.route);
        return (this.isSuccess(result))   ? RemoteCallResult.Success
                                          : RemoteCallResult.Failure
    }

    private isSuccess(response) {
        return response.status === 204 || response.status === 200 || response.status === 202;
    }
}