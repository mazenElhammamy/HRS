import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import { Schema } from '../Schema/EmployeeFormSchema'
import DepartmentStore from './../Store/departmentStore';
import TitleStore from './../Store/titleStore';
import * as DepartmentActions from "../Actions/DepartmentActions"
import * as TitletActions from "../Actions/TitleActions"
import * as EmployeeActions from "../Actions/EmployeeActions"

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
        titleId: "",
        departmentId: "",
        mangerName: "",
        admin: Boolean

    },
    errorMap: {},
    errorMessage: '',
    departments: [],
    titles: []

};
export default class AddEmployee extends Component {
    constructor() {
        super()
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
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
            email:this.state.employee.email,
            password:this.state.employee.password,
            homeNumber: this.state.employee.homeNumber,
            mobileNumber:this.state.employee.mobileNumber,
            address: this.state.employee.address,
            sallary:this.state.employee.sallary
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
            this.setState({ errorMap})  
        }
        return result
    };
    handleChange(e) {
        let state = { ...this.state.employee };
        state[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ employee: state });

    };
    handleDepartmentChange(e) {
        let state = { ...this.state.employee };
        state[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ employee: state });
        TitletActions.gitTitlesByDepartment(e.currentTarget.value);
        TitleStore.on("change", () => {
            this.setState({ titles: TitleStore.getAll() });
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        const isValid = this.validate();
        if (isValid) {
            const errorMap = {};
            this.setState({errorMap})
             const employee = this.state.employee
             EmployeeActions.addNewEmployee(employee);
             this.props.history.push('/employeeHome');
        } 
    };
    render() {
        return (
            <Form className='container mt-10' onSubmit={this.handleSubmit} >
                <h2 className="h3 mb-4 page-title">Add Employee</h2>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="First name" onChange={this.handleChange}      
                            value={this.state.employee.firstname} name="firstname" />              
                        {this.state.errorMap.firstname && <div className="alert alert-danger">{this.state.errorMap.firstname}</div>}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Last name" onChange={this.handleChange}
                            value={this.state.employee.lastname} name="lastname" />
                        {this.state.errorMap.lastname && <div className="alert alert-danger">{this.state.errorMap.lastname}</div>}
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="formGridFullName">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control placeholder="Full name" onChange={this.handleChange}
                        value={this.state.employee.fullname} name="fullname"/>
                    {this.state.errorMap.fullname && <div className="alert alert-danger">{this.state.errorMap.fullname}</div>}
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" onChange={this.handleChange}
                        value={this.state.employee.email} name="email" />
                        {this.state.errorMap.email && <div className="alert alert-danger">{this.state.errorMap.email}</div>}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"onChange={this.handleChange}
                            value={this.state.employee.password}name="password"/>
                        {this.state.errorMap.password && <div className="alert alert-danger">{this.state.errorMap.password}</div>}
                    </Form.Group>
                </Form.Row>
                    <Form.Group controlId="formGridAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St"onChange={this.handleChange}
                            value={this.state.employee.address} name="address" />
                        {this.state.errorMap.address && <div className="alert alert-danger">{this.state.errorMap.address}</div>}
                    </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridMobileNumber">
                        <Form.Label>Mobile number</Form.Label>
                        <Form.Control type="text" placeholder="mobile number"onChange={this.handleChange}
                            value={this.state.employee.mobileNumber} name="mobileNumber"/>
                        {this.state.errorMap.mobileNumber && <div className="alert alert-danger">{this.state.errorMap.mobileNumber}</div>}
                    </Form.Group>
                <Form.Group as={Col} controlId="formGridHomeNumber">
                    <Form.Label>Home number</Form.Label>
                    <Form.Control type="text" placeholder="home number" onChange={this.handleChange}
                        value={this.state.employee.homeNumber} name="homeNumber" />
                    {this.state.errorMap.homeNumber && <div className="alert alert-danger">{this.state.errorMap.homeNumber}</div>}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridSallary">
                        <Form.Label>Sallary</Form.Label>
                        <Form.Control type="text" placeholder="..." onChange={this.handleChange}
                            value={this.state.employee.sallary}name="sallary"/>
                        {this.state.errorMap.sallary && <div className="alert alert-danger">{this.state.errorMap.sallary}</div>}
                    </Form.Group> 
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridDepartment">
                        <Form.Label>Department</Form.Label>
                        <select className="form-control" aria-label="Default select example"
                            id="departmentId" value={this.state.employee.departmentId}
                            onChange={this.handleDepartmentChange}name="departmentId" >
                            <option >Choose from these departments:</option>
                            {this.state.departments.map((department) => {
                                return (
                                    <option key={department._id} value={department._id}>{department.departmentName}</option>
                                )
                            })}
                        </select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridTitle">
                        <Form.Label>Title</Form.Label>
                        <select  className="form-control" aria-label="Default select example"
                            id="titleId" value={this.state.employee.titleId} onChange={this.handleChange} name="titleId">
                            <option >Choose from these titles:</option>
                            {this.state.titles.map((title) => {
                                return (
                                    <option key={title._id} value={title._id}>{title.titleName}</option>
                                )
                            })}
                        </select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridRepotsTo">
                        <Form.Label>Reports To</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        )
    }
}