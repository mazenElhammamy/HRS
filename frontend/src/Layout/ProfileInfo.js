import React, { Component } from 'react';
import { ThemeProvider } from 'react-bootstrap';
import * as EmployeeActions from "../Actions/EmployeeActions"
import EmployeeStore from './../Store/employeeStore';




export default class ProfileInfo extends Component {
    constructor() {
        super()
        this.state = {
            employee: {},
        }
        this.profileInfo = this.profileInfo.bind(this)
        this.getEmployeeData = this.getEmployeeData.bind(this)
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

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div width="250" height="250">
                            <img src="./img/default.png" width="250" height="150" alt="" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                            <h5>INFO</h5>
                            <hr />
                            {this.profileInfo("Name", this.state.employee.fullname )}
                            {this.profileInfo("Email", this.state.employee.email)}
                            {this.profileInfo("Phone", this.state.employee.mobileNumber)}
                            {this.profileInfo("Profession",this.state.employee.title &&  this.state.employee.title.length>0 ? this.state.employee.title[0].titleName: "")}
                            {this.profileInfo("Department",this.state.employee.department &&  this.state.employee.department.length>0 ? this.state.employee.department[0].departmentName: "")}
                        </div>
                    </div>

                </div>
             
            </div>



        )
    }
}
