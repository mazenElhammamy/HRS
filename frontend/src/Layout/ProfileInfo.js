import React, { Component } from 'react';
import * as EmployeeActions from "../Actions/EmployeeActions"
import EmployeeStore from './../Store/employeeStore';
import RequestFormPopup from './RequestFormPopup';



export default class ProfileInfo extends Component {
    constructor() {
        super()
        this.state = {
            employee: "",
        }
        this.profileInfo = this.profileInfo.bind(this);
        this.getEmployeeData = this.getEmployeeData.bind(this);
        this.hierarchy = this.hierarchy.bind(this);
    }
    getEmployeeData() {
        this.setState({ employee: EmployeeStore.getEmployeeData() })
    }
    componentDidMount() {
        EmployeeActions.getMyData();
        EmployeeStore.on("change", this.getEmployeeData);
    }
    componentWillUnmount() {
        EmployeeStore.removeListener("change", this.getEmployeeData)

    }
    profileInfo(lable, data) {
        return (
            <div className="row">
                <div className="col-md-6">
                    <p>{lable}</p>
                </div>
                <div className="col-md-6">
                    <h6>{data}</h6>
                </div>
            </div>
        )
    }

    hierarchy() {
        return (
            <div className="tracking-list">
                { this.state.employee.mangers && this.state.employee.mangers.length > 0 ? this.state.employee.mangers.map((manger) => {
                   console.log(manger.photo)
                   return (
                        <div className="tracking-item" key={manger.id}>
                            {
                               manger.photo != null ?
                                  <img src={`.././uploadedPhotos/${manger.photo}`} alt="..." className="tracking-icon status-intransit"  />
                                  :  <img src="./img/default.png" className="tracking-icon status-intransit"  alt="" />
                          }
                            <div className="tracking-content"><span>{manger.fullname}</span>{manger.title[0].titleName}</div>
                        </div>
                    )
                }) : ""}
                <div className="tracking-item shift"  >
                    <div className="border"></div>
                    {
                               this.state.employee.info.photo != null ?
                                  <img src={`.././uploadedPhotos/${this.state.employee.info.photo}`} alt="..." className="tracking-icon status-intransit"  />
                                  :  <img src="./img/default.png" className="tracking-icon status-intransit"  alt="" />
                          }
                    <div className="tracking-content"><span>{this.state.employee.info.fullname}</span>{this.state.employee.info.title[0].titleName}</div>
                </div>
            </div>
        )


    }
    render() {

        return (
           
            <div className="container">
                 {this.state.employee !="" ?
                  <div className="row">
                  <div className="col-md-4">
                       <div width="250" height="250">
                          {
                               this.state.employee.info.photo != null ?
                                  <img src={`.././uploadedPhotos/${this.state.employee.info.photo}`} alt="..." className="avatar d-block mb-4 rounded-circle " width="200" height="200" />
                                  :  <img src="./img/default.png" width="200" height="120" alt="" />
                          }

                         
                          <RequestFormPopup x="change photo" />

                      </div> 
                  </div>
                  <div className="col-md-4">
                      <div className="profile-head">
                          <h5>INFO</h5>
                          <hr />
                          {this.profileInfo("Name", this.state.employee.info.fullname)}
                          {this.profileInfo("Email", this.state.employee.info.email)}
                          {this.profileInfo("Phone", this.state.employee.info.mobileNumber)}
                          {this.profileInfo("Profession", this.state.employee.info.title && this.state.employee.info.title.length > 0 ? this.state.employee.info.title[0].titleName : "")}
                          {this.profileInfo("Department", this.state.employee.info.department && this.state.employee.info.department.length > 0 ? this.state.employee.info.department[0].departmentName : "")}
                      </div>
                  </div>
                  <div className="col-md-4">
                      {this.hierarchy()}
                  </div>
              </div> :
              ""
                  }
               
            </div>
        )
    }
}
