import axios from 'axios';
import { CallRemoteMethod, RemoteCallResult } from '../../businessLogic/Actions/CallRemoteMethod';


export class WebApiGetFireAndForget extends CallRemoteMethod{    
    constructor(private route: string) {
        super()
    }
        
    protected async callMethod(): Promise<RemoteCallResult> {
        axios.get(this.route);
        return RemoteCallResult.Success
    }
}