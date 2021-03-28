import { EventEmitter } from "events";
import dispatcher from '../dispatcher/dispatcher'
class EmployeeStore extends EventEmitter {
    constructor() {
        super()
        this.loggedIn = false
        this.employees = []
        this.mangers =[]
        this.employee = {
            info:"",
            mangers:""
        }
    }
    getAllEmployees(data) {
        this.employees = data;
        this.emit("change")
    }
    getMyData(data) {
        this.employee.info = data.employee;
        this.employee.mangers = data.mangers;
        this.emit("change")
    }
    updatePhoto(data){
        this.employee.info.photo = data;
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
        return this.employee
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
                break;
            }
            case "LOGGED_IN": {
                this.setLoggedIn(action);
                break;
            }
            case "GET_MY_DATA": {
                this.getMyData(action.data);
                break;
            }
            case "UPDATE_PHOTO" :{
                this.updatePhoto(action.data);
                break;
            }

        }
    }
}
const employeeStore = new EmployeeStore;
dispatcher.register(employeeStore.handleActions.bind(employeeStore));
export default employeeStore;