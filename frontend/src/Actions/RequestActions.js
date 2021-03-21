import dispatcher from "../dispatcher/dispatcher";
import axios from "axios"

export function createRequest(request) {
    const options = {
        method: 'POST',
        headers: {
            Authorization: localStorage.getItem('token'),

        },
        data: request,
        url: 'http://localhost:5000/api/verifyEmployee/createRequest',
    };

    axios(options)
        .then((res) => {
            
            dispatcher.dispatch({
                type: "ADD_NEW_REQUEST",
                data: res.data.request,
            });
        })
        .catch((err) => {
            console.log(err)
        });

}
export function getMyRequests() {
    const options = {
        method: 'POST',
        headers: {
            Authorization: localStorage.getItem('token'),

        },
        url: 'http://localhost:5000/api/verifyEmployee/getMyRequests'
    }

    axios(options)
        .then((res) => {
            dispatcher.dispatch({
                type: "GET_MY_REQUESTS",
                data: res.data.requests,
            });
        })
        .catch((err) => {
            console.log(err)
        });

}

export function getMyRequestsApplications() {
    const options = {
        method: 'POST',
        headers: {
            Authorization: localStorage.getItem('token'),

        },
        url: 'http://localhost:5000/api/verifyEmployee/getMyRequestsApplications'
    }

    axios(options)
        .then((res) => {
            console.log("reeeeeeeee", res.data.requests)
            dispatcher.dispatch({
                type: "GET_MY_REQUESTS",
                data: res.data.requests,
            });

        })
        .catch((err) => {
            console.log(err)
        });

}

export function editRequest(obj) {
    console.log(obj)
    const options = {
      method: 'PUT',
      data: obj,
      url: 'http://localhost:5000/api/request/editRequest',
    };
    return axios(options)
    .then((res) => {
        console.log("resultttt", res.data.request)
        dispatcher.dispatch({
            type: "GET_MY_UPDATED_REQUESTS",
            data: res.data.request,
        });
    
    })
    .catch((err) => {
      console.log(err)
    });;
     
  
  }