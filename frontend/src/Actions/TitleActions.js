import dispatcher from "../dispatcher/dispatcher";
import axios from "axios"

export function createTitle(jobTitle, history) {
   console.log(jobTitle)
   const options = {
      method: 'POST',
      data: jobTitle,
      url: 'http://localhost:5000/api/title/addTitle',
   };
   axios(options)
      .then((res) => {
         console.log(res)
         history.push('/home');
      })
      .catch((err) => {
         console.log(err)
      });
}

export function getTitlesByDepartment(departmentId) {
   const options = {
      method: 'POST',
      data: { departmentId: departmentId },
      url: 'http://localhost:5000/api/title/titleByDepartment',
   };
   axios(options)
      .then((res) => {
         dispatcher.dispatch({
            type: "GET_TITLES-BY-DEPARTMENT",
            data: res.data.titles,
         });
      })
      .catch((err) => {
         console.log(err)
      });

}