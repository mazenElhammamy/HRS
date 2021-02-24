import dispatcher from "../dispatcher/dispatcher";
import axios from "axios"

export async function addNewEmployee(employee) {
 console.log("title from action ",employee)
    const options = {
        method: 'POST',
        data: employee,
        url: 'http://localhost:5000/api/employee/addNewEmployee',
    };
  await  axios(options)
        .then((res) => {
           console.log(res)
        })
        .catch((err) => {
           console.log(err)
        });
  
}

