import dispatcher from "../dispatcher/dispatcher";
import axios from "axios"
export async function createDepartment(department) {
    const options = {
        method: 'POST',
        data: department,
        url: 'http://localhost:5000/api/department/addDepartment',
    };
  await  axios(options)
        .then((res) => {
            console.log("done",res)
            // dispatcher.dispatch({
            //     type:"CREATE_DEPARTMENT",
            //     data:res.data.departments,
            // });
        })
        .catch((err) => {
           console.log(err)
        });
  
}

export async function  getAllDepartment() {
   await axios.get('http://localhost:5000/api/department/getAllDepartment')
        .then((res) => {
            console.log("done",res)
            dispatcher.dispatch({
                type:"GET_ALL_DEPARTMENTS",
                data:res.data.departments,
            });
        })
        .catch((err) => {
           console.log(err)
        });
  
}