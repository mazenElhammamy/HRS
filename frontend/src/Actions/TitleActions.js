import dispatcher from "../dispatcher/dispatcher";
import axios from "axios"

export async function createTitle(title) {
 console.log("title from action ",title)
    const options = {
        method: 'POST',
        data: title,
        url: 'http://localhost:5000/api/title/addTitle',
    };
  await  axios(options)
        .then((res) => {
           console.log(res)
        })
        .catch((err) => {
           console.log(err)
        });
  
}

export async function gitTitlesByDepartment(departmentId) {
      const options = {
          method: 'POST',
          data:{departmentId:departmentId} ,
          url: 'http://localhost:5000/api/title/titleByDepartment',
      };
    await  axios(options)
          .then((res) => {
            dispatcher.dispatch({
               type:"GIT_TITLES-BY-DEPARTMENT",
               data:res.data.titles,
           });
          })
          .catch((err) => {
             console.log(err)
          });
    
  }