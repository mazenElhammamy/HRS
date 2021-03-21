import { EventEmitter } from "events";
import dispatcher from '../dispatcher/dispatcher'
class RequestStore extends EventEmitter {
    constructor() {
        super()
        this.requests = []
    }
    getAllRequests(data) {
        this.requests = data;
        this.emit("change")
    }
    getAll() {
        return this.requests;
    }
    addNewRequests(request){
        this.requests.push(request);
        this.emit("change");

    }
    getUpdatedRequest(request){
        const updatedIndex =  this.requests.findIndex(currentReq =>  currentReq._id == request.id);  
        if(updatedIndex > -1){
            this.requests[updatedIndex].status = request.status;
            
        }
        this.emit("change");
    }
    handleActions(action) {
        switch (action.type) {
            case "GET_MY_REQUESTS": {
                this.getAllRequests(action.data);
                break;
            }
            case "ADD_NEW_REQUEST":{
                
                this.addNewRequests(action.data);
                break;
            }
            case "GET_MY_UPDATED_REQUESTS":{
                this.getUpdatedRequest(action.data)
            }
        }
    }
}
const requestStore = new RequestStore;
dispatcher.register(requestStore.handleActions.bind(requestStore));
export default requestStore;