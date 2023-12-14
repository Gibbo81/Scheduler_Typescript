import axios from 'axios';
import { CallRemoteMethod, RemoteCallResult } from '../../businessLogic/Actions/CallRemoteMethod';


export class WebApiDeleteFireAndForget extends CallRemoteMethod{
    constructor(private route: string) {
        super()
    }    
    
    protected async callMethod(): Promise<RemoteCallResult> {
        axios.delete(this.route);
        return RemoteCallResult.Success
    }
}