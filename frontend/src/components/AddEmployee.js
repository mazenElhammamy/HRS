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

const initialState = {
    employee: {
        firstname: '',
        lastname: '',
        fullname: '',
        email: "",
        password: '',
        mobileNumber: '',
        homeNumber: '',
        sallary: "",
        address: "",
        titleName: "",
        departmentName: "",    
        mangerId: null,
        admin: Boolean

    },
    errorMap: {},
    departments: [],
    titles: [],
    leaders: [],
    
};
export default class AddEmployee extends Component {
    constructor() {
        super()
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.addFormRow = this.addFormRow.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.getTitles = this.getTitles.bind(this);
        this.getLeaders = this.getLeaders.bind(this);
        this.getDepartments = this.getDepartments.bind(this);
    }

    componentDidMount() {
        DepartmentActions.getAllDepartment();
        DepartmentStore.on("change", this.getDepartments);
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
                TitleStore.on("change",this.getTitles)
                break;
            case "titleId":
                EmployeeActions.getAllLeaders(selectedOption.value);
                EmployeeStore.on("change",this.getLeaders)
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
            EmployeeActions.addNewEmployee(employee, this.props.history);

        }
    };

    addFormRow(formGroups) {
        return (
            <Form.Row>
                {
                    formGroups.map((group => {
                        return (
                            addFormGroup(group.controlId, group.label,group.placeholder, group.fieldValue, group.fieldName, this.handleChange, this.state.errorMap, group.type)
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
    getDepartments(){
        this.setState({ departments: DepartmentStore.getAll() })
    }
    componentWillUnmount(){
        TitleStore.removeListener("change",this.getTitles)
        EmployeeStore.removeListener("change",this.getLeaders)
        DepartmentStore.removeListener("change",this.getDepartments)
    }
    render() {
        const firstnameGroup = {
            controllId: "formGridFirstName",
            label: "First name",
            placeholder:"First name",
            fieldValue: this.state.employee.firstname,
            fieldName: "firstname",
            type: "text"
        }
        const lastnameGroup = {
            controllId: "formGridLastName",
            label: "Last name",
            placeholder:"Last name",
            fieldValue: this.state.employee.lastname,
            fieldName: "lastname",
            type: "text"
        }

        const fullnameGroup = {
            controllId: "formGridFullName",
            label: "Full name",
            placeholder:"Full name",
            fieldValue: this.state.employee.fullname,
            fieldName: "fullname",
            type: "text"
        }
        const emailGroup = {
            controllId: "formGridEmail",
            label: "Email",
            placeholder:"Email",
            fieldValue: this.state.employee.email,
            fieldName: "email",
            type: "text"
        }
        const passwordGroup = {
            controllId: "formGridPassword",
            label: "Password",
            placeholder:"Password",
            fieldValue: this.state.employee.password,
            fieldName: "password",
            type: "password"
        }
        const addressGroup = {
            controllId: "formGridAddress",
            label: "Address",
            placeholder:"Address",
            fieldValue: this.state.employee.address,
            fieldName: "address",
            type: "text"
        }
        const mobileNumberGroup = {
            controllId: "formGridMobileNumber",
            label: "Mobile number",
            placeholder:"Mobile number",
            fieldValue: this.state.employee.mobileNumber,
            fieldName: "mobileNumber",
            type: "text"
        }
        const homeNumberGroup = {
            controllId: "formGridHomeNumber",
            label: "Home number",
            placeholder:"Home number",
            fieldValue: this.state.employee.homeNumber,
            fieldName: "homeNumber",
            type: "text"
        }
        const sallaryGroup = {
            controllId: "formGridSallary",
            label: "Sallary",
            placeholder:"Sallary",
            fieldValue: this.state.employee.sallary,
            fieldName: "sallary",
            type: "text"
        }
        return (
            <Form className='container mt-10 mb-5 pb-5' onSubmit={this.handleSubmit} >
                <h2 className="h3 mb-4 page-title">Add Employee</h2>
                {this.addFormRow([firstnameGroup, lastnameGroup])}
                {this.addFormRow([fullnameGroup])}
                {this.addFormRow([emailGroup, passwordGroup])}
                {this.addFormRow([addressGroup])}
                {this.addFormRow([mobileNumberGroup, homeNumberGroup, sallaryGroup])}
                <Form.Row>
                    {addSelectFormGroup("formGridDepartment", "Department", this.state.employee.department, this.handleSelectChange, this.state.departments, "_id", "departmentName", "departmentId")}
                    {addSelectFormGroup("formGridTitle", "Title", this.state.employee.title, this.handleSelectChange, this.state.titles, "_id", "titleName", "titleId")}
                    {addSelectFormGroup("formGridLeader", "Reports To", this.state.employee.leader, this.handleSelectChange, this.state.leaders, "_id", "fullname", "mangerId")}
                </Form.Row>
               {formButton("Submit")}
            </Form>

        )
    }
}