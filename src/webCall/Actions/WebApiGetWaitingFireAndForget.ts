import axios from 'axios';
import { CallRemoteMethod, RemoteCallResult } from '../../businessLogic/Actions/CallRemoteMethod';


export class WebApiGetWaitingFireAndForget extends CallRemoteMethod{    
    constructor(private route: string) {
        super()
    }
        
    protected async callMethod(): Promise<RemoteCallResult> {
        await axios.get(this.route);
        return RemoteCallResult.Success
    }
}