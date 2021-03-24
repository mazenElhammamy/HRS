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
      dispatcher.dispatch({
        type: "LOGGED_IN",
        data: res.data.token,
        history: history
      });
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
      dispatcher.dispatch({
        type: "GET_ALL_Employees",
        data: res.data.leaders,
      });
    })
    .catch((err) => {
      console.log("errr", err)
    });
}
export function getMyData() {
  const options = {
      method: 'POST',
      headers: {
          Authorization: localStorage.getItem('token'),

      },
      url: 'http://localhost:5000/api/verifyEmployee/getMyData'
  }
  axios(options)
  .then((res) => {
      dispatcher.dispatch({
          type: "GET_MY_DATA",
          data:{
            employee:res.data.employee[0],
            mangers :res.data.mangers,
          } 
      });

  })
  .catch((err) => {
      console.log(err)
  });

}

export function uploadPhoto(data) {
  const options = {
    method: 'put',
    headers: {
      Authorization: localStorage.getItem('token'),
      'Content-Type': 'multipart/form-data',
    },
    data: data,
    url: 'http://localhost:5000/api/verifyEmployee/uploadPhoto',
  };
  axios(options)
    .then((res) => {
      const user = res.data.user;
      this.props.setUser(user);
      this.props.history.push('/profile');
    })
    .catch((err) => {
      console.log(err.response);
    });
}