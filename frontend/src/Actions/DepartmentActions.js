import dispatcher from "../dispatcher/dispatcher";
import axios from "axios"
export function createDepartment(department, history) {
    const options = {
        method: 'POST',
        data: department,
        url: 'http://localhost:5000/api/department/addDepartment',
    };
    axios(options)
        .then((res) => {
            dispatcher.dispatch({
                type: "CREATE_DEPARTMENT",
                data: res.data.departments,
            });
            history.push('/allDepartment');
        })
        .catch((err) => {
            console.log(err)
        });

}

export function getAllDepartment() {
    axios.get('http://localhost:5000/api/department/getAllDepartment')
        .then((res) => {
            dispatcher.dispatch({
                type: "GET_ALL_DEPARTMENTS",
                data: res.data.departments,
            });
        })
        .catch((err) => {
            console.log(err)
        });

}

export function deleteDepartment(_id) {
    const options = {
        method: 'POST',
        data: { _id: _id },
        url: 'http://localhost:5000/api/department/deleteDepartment',
    };
    axios(options)
        .then((res) => {
            console.log("done", res.data)
        })
        .catch((err) => {
            console.log(err)
        });

}