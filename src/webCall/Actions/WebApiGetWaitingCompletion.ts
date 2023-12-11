import axios from 'axios';
import { CallRemoteMethod, RemoteCallResult } from '../../businessLogic/Actions/CallRemoteMethod';


export class WebApiGetWaitingCompletion extends CallRemoteMethod{    
    constructor(private route: string) {
        super()
    }
        
    protected async callMethod(): Promise<RemoteCallResult> {
        const response = await axios.get(this.route);
        return (response.status===200)  ? RemoteCallResult.Success
                                        : RemoteCallResult.Failure
    }
}