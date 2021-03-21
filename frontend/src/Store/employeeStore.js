import { EventEmitter } from "events";
import dispatcher from '../dispatcher/dispatcher'
class EmployeeStore extends EventEmitter {
    constructor() {
        super()
        this.loggedIn = false
        this.employees = []
        this.employee = {}
    }
    getAllEmployees(data) {
        this.employees = data;
        this.emit("change")
    }
    getMyData(data) {
        this.employee = data
        this.emit("change")
    }
    setLoggedIn(action) {
        if (action) {
            localStorage.setItem('token', action.data);
            this.loggedIn = true;
            action.history.push('/home');
            this.emit("change");

        } else {
            this.loggedIn = true;
            this.emit("change");
        }

    }
    logout() {
        localStorage.clear();
        this.loggedIn = false;
        this.emit("change");
    }
    getEmployeeData() {
        return this.employee;
    }
    getLoggedIn() {
        return this.loggedIn;
    }


    getAll() {
        return this.employees;
    }
    handleActions(action) {
        switch (action.type) {
            case "GET_ALL_Employees": {
                this.getAllEmployees(action.data);
            }
            case "LOGGED_IN": {
                this.setLoggedIn(action)
            }
            case "GET_MY_DATA": {
                this.getMyData(action.data)
            }

        }
    }
}
const employeeStore = new EmployeeStore;
dispatcher.register(employeeStore.handleActions.bind(employeeStore));
export default employeeStore;