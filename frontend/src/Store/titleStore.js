import { EventEmitter } from "events";
import dispatcher from '../dispatcher/dispatcher'
class TitleStore extends EventEmitter {
    constructor() {
        super()
        this.titles = []
    }
    getTitlesByDepartment(data) {
        this.titles = data;
        this.emit("change")
    }
    getAll() {
        return this.titles;
    }
    handleActions(action) {
        switch (action.type) {
            case "GIT_TITLES-BY-DEPARTMENT": {
                this.getTitlesByDepartment(action.data);
            }
        }
    }
}
const titleStore = new TitleStore;
dispatcher.register(titleStore.handleActions.bind(titleStore));
export default titleStore;