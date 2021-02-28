import { EventEmitter } from "events";
import dispatcher from '../dispatcher/dispatcher'
class DepartmentStore extends EventEmitter {
    constructor() {
        super()
        this.departments = []
    }
    getAllDepartments(data) {
        this.departments = data;
        this.emit("change")
    }
    getAll() {
        return this.departments;
    }
    handleActions(action) {
        switch (action.type) {
            case "GET_ALL_DEPARTMENTS": {
                this.getAllDepartments(action.data);
            }
        }
    }
}
const departmentStore = new DepartmentStore;
dispatcher.register(departmentStore.handleActions.bind(departmentStore));
export default departmentStore;