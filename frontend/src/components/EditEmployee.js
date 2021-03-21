import React, { Component } from 'react';
import { Form } from 'react-bootstrap'
import { Schema } from '../Schema/EmployeeFormSchema'
import DepartmentStore from './../Store/departmentStore';
import TitleStore from './../Store/titleStore';
import * as DepartmentActions from "../Actions/DepartmentActions"
import * as TitletActions from "../Actions/TitleActions"
import * as EmployeeActions from "../Actions/EmployeeActions"
import { addFormGroup, addSelectFormGroup ,formButton } from "../utils/formUtils"
import EmployeeStore from './../Store/employeeStore';

export default class EditEmployee extends Component {
    constructor(props) { 
        super(props)
        this.state = {
            employee: {
                _id:this.props.location.state._id,
                firstname:this.props.location.state.firstname,
                lastname: this.props.location.state.lastname,
                fullname: this.props.location.state.fullname,
                email:this.props.location.state.email,
                password:this.props.location.state.password,
                mobileNumber: this.props.location.state.mobileNumber,
                homeNumber:this.props.location.state.homeNumber,
                sallary: this.props.location.state.sallary,
                address: this.props.location.state.address,
                titleId:this.props.location.state.titleId,
                departmentId:this.props.location.state.departmentId,
                mangerId:this.props.location.state.mangerId,
                titleName:this.props.location.state.titleName,
                departmentName:this.props.location.state.departmentName,
                mangerName:this.props.location.state.mangerName,
            },
            errorMap: {},
            departments: [],
            titles: [],
            leaders: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.addFormRow = this.addFormRow.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.getTitles = this.getTitles.apply.bind(this);
        this.getLeaders = this.getLeaders.bind(this);
    }

    componentDidMount() {
        DepartmentActions.getAllDepartment();
        DepartmentStore.on("change", () => {
            this.setState({ departments: DepartmentStore.getAll() });
        });
    }


    validate() {
        const employee = {
            firstname: this.state.employee.firstname,
            lastname: this.state.employee.lastname,
            fullname: this.state.employee.fullname,
            email: this.state.employee.email,
            password: this.state.employee.password,
            homeNumber: this.state.employee.homeNumber,
            mobileNumber: this.state.employee.mobileNumber,
            address: this.state.employee.address,
            sallary: this.state.employee.sallary,

        }
        const { error } = Schema.validate(employee, { abortEarly: false });
        const errorMap = {};
        var result = true;
        if (error) {
            result = false
            error.details.forEach(errorDetails => {
                const key = errorDetails.context.key;
                errorMap[key] = errorDetails.message;
            });
            this.setState({ errorMap })
        }
        return result
    };
    handleChange(e) {
        let state = { ...this.state.employee };
        state[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ employee: state });

    };


    handleSelectChange(selectedOption, name) {
        let employee = { ...this.state.employee };
        employee[name] = selectedOption.value;
        this.setState({ employee })
        switch (name) {
            case "departmentId":
                TitletActions.getTitlesByDepartment(selectedOption.value);
                TitleStore.on("change", this.getTitles)
                break;
            case "titleId":
                EmployeeActions.getAllLeaders(selectedOption.value);
                EmployeeStore.on("change", this.getLeaders)
                break;
        }
    }
  
    handleSubmit(e) {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            const errorMap = {};
            this.setState({ errorMap })
            const employee = this.state.employee
            EmployeeActions.editEmployee(employee, this.props.history);

        }
    };

    addFormRow(formGroups) {
        return (
            <Form.Row>
                {
                    formGroups.map((group => {
                        return (
                            addFormGroup(group.controlId, group.label, group.fieldValue, group.fieldName, this.handleChange, this.state.errorMap, group.type)
                        )
                    }))
                }
            </Form.Row>
        )
    }

    getTitles(){
        this.setState({ titles: TitleStore.getAll() })
    }
    getLeaders(){
        this.setState({ leaders: EmployeeStore.getAll() })
    }
    componentWillUnmount(){
        TitleStore.removeListener("change",this.getTitles )
        EmployeeStore.removeListener("change",this.getLeaders )
        // remove listener to change event
    }
    render() {
        const firstnameGroup = {
            controllId: "formGridFirstName",
            label: "First name",
            fieldValue: this.state.employee.firstname,
            fieldName: "firstname",
            type: "text"
        }
        const lastnameGroup = {
            controllId: "formGridLastName",
            label: "Last name",
            fieldValue: this.state.employee.lastname,
            fieldName: "lastname",
            type: "text"
        }

        const fullnameGroup = {
            controllId: "formGridFullName",
            label: "Full name",
            fieldValue: this.state.employee.fullname,
            fieldName: "fullname",
            type: "text"
        }
        const emailGroup = {
            controllId: "formGridEmail",
            label: "email",
            fieldValue: this.state.employee.email,
            fieldName: "email",
            type: "text"
        }
        const passwordGroup = {
            controllId: "formGridPassword",
            label: "Password",
            fieldValue: this.state.employee.password,
            fieldName: "password",
            type: "password"
        }
        const addressGroup = {
            controllId: "formGridAddress",
            label: "Address",
            fieldValue: this.state.employee.address,
            fieldName: "address",
            type: "text"
        }
        const mobileNumberGroup = {
            controllId: "formGridMobileNumber",
            label: "Mobile number",
            fieldValue: this.state.employee.mobileNumber,
            fieldName: "mobileNumber",
            type: "text"
        }
        const homeNumberGroup = {
            controllId: "formGridHomeNumber",
            label: "Home number",
            fieldValue: this.state.employee.homeNumber,
            fieldName: "homeNumber",
            type: "text"
        }
        const sallaryGroup = {
            controllId: "formGridSallary",
            label: "Sallary",
            fieldValue: this.state.employee.sallary,
            fieldName: "sallary",
            type: "text"
        }
        return (
            <Form className='container mt-10' onSubmit={this.handleSubmit} >
                <h2 className="h3 mb-4 page-title">Edit Employee</h2>
                {this.addFormRow([firstnameGroup, lastnameGroup])}
                {this.addFormRow([fullnameGroup])}
                {this.addFormRow([emailGroup, passwordGroup])}
                {this.addFormRow([addressGroup])}
                {this.addFormRow([mobileNumberGroup, homeNumberGroup, sallaryGroup])}
                <Form.Row>
                                                                    {/* addSelectFormGroup(controlId, label, fieldValue, handleChange, options, labels, value, name)  */}
                    {addSelectFormGroup("formGridDepartment", "Department", this.state.employee.departmentName, this.handleSelectChange, this.state.departments, "_id", "departmentName", "departmentId")}
                    {addSelectFormGroup("formGridTitle", "Title", this.state.employee.titleName, this.handleSelectChange, this.state.titles, "_id", "titleName", "titleId")}
                    {addSelectFormGroup("formGridLeader", "Reports To", this.state.employee.mangerName, this.handleSelectChange, this.state.leaders, "_id", "fullname", "mangerId")}
                </Form.Row>
               {formButton("Edit")}
            </Form>

        )
    }
}