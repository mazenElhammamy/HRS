import dispatcher from "../dispatcher/dispatcher";
import axios from "axios"

export function addNewEmployee(employee, history) {
  const options = {
    method: 'POST',
    data: employee,
    url: 'http://localhost:5000/api/employee/addNewEmployee',
  };
  axios(options)
    .then((res) => {
      history.push('/home');
    })
    .catch((err) => {
      console.log(err)
    });

}
export function login(data, history) {
  const options = {
    method: 'POST',
    data: data,
    url: 'http://localhost:5000/api/employee/login',
  };
  axios(options)
    .then((res) => {
      console.log("resssss", res)
      dispatcher.dispatch({
        type: "LOGGED_IN",
        data: res.data.token,
        history: history
      });
      // localStorage.setItem('token', res.data.token);
    })
    .catch((err) => {
      console.log("errrrrr", err)
    });

}
export function editEmployee(employee, history) {
  const options = {
    method: 'PUT',
    data: employee,
    url: 'http://localhost:5000/api/employee/editEmployee',
  };
  axios(options)
    .then((res) => {
      history.push('/home');
    })
    .catch((err) => {
      console.log(err)
    });

}
export function getAllEmployees() {
  axios.get('http://localhost:5000/api/employee/getAllEmployees')
    .then((res) => {
      dispatcher.dispatch({
        type: "GET_ALL_Employees",
        data: res.data.employees,
      });
    })
    .catch((err) => {
      console.log(err)
    });

}
export function getAllLeaders(titleId) {
  const options = {
    method: 'POST',
    data: { titleId },
    url: 'http://localhost:5000/api/employee/findLeaders',
  };
  axios(options)
    .then((res) => {
      console.log("ressss", res.data.leaders)
      dispatcher.dispatch({
        type: "GET_ALL_Employees",
        data: res.data.leaders,
      });
    })
    .catch((err) => {
      console.log("errr", err)
    });
}