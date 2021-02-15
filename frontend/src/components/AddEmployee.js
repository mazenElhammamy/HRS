import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import { Schema } from '../Schema/EmployeeFormSchema'

const initialState = {
    employee: {
        firstname: '',
        lastname: '',
        fullname: '',
        email: "",
        password: '',
        mobileNumber: '',
        homeNumber: '',
        sallary:"",
        address: "",
        title: "",
        Department: "",
        mangerName: "",
        admin: Boolean

    },
    errorMap: {},
    errorMessage: '',

};
export default class AddEmployee extends Component {
    constructor() {
        super()
        this.state = initialState;
    }


    validate = () => {
        const { error } = Schema.validate(this.state.employee, { abortEarly: false });
        const errorMap = {};
        if (error) {
            error.details.forEach(errorDetails => {
                const key = errorDetails.context.key;
                errorMap[key] = errorDetails.message;
            });
            this.setState({ errorMap })
            return false
        }
        return true
    };
    handleChange = (e) => {
        let state = { ...this.state.employee };
        state[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ employee: state });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log("done")
        }

    };
    render() {
        return (
            <Form className='container mt-10' onSubmit={this.handleSubmit} >
                <h2 className="h3 mb-4 page-title">Add Employee</h2>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirstName"
                       >
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="First name" 
                         onChange={this.handleChange}
                         value={this.state.employee.firstname}
                         name="firstname"/>
                         {this.state.errorMap.firstname && <div className="alert alert-danger">{this.state.errorMap.firstname}</div>}
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="formGridLastName"
                         >
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Last name"
                        onChange={this.handleChange}
                        value={this.state.employee.lastname}
                        name="lastname"
                        />
                         {this.state.errorMap.lastname && <div className="alert alert-danger">{this.state.errorMap.lastname}</div>}
                    </Form.Group>
                   
                </Form.Row>
                <Form.Group controlId="formGridFullName"
                   >
                    <Form.Label>Full name</Form.Label>
                    <Form.Control placeholder="Full name"
                     onChange={this.handleChange}
                     value={this.state.employee.fullname}
                     name="fullname"
                    />
                    {this.state.errorMap.fullname && <div className="alert alert-danger">{this.state.errorMap.fullname}</div>}
                </Form.Group>
                
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail"
                        >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                        onChange={this.handleChange}
                        value={this.state.employee.email}
                        name="email"
                        />
                        {this.state.errorMap.email && <div className="alert alert-danger">{this.state.errorMap.email}</div>}
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="formGridPassword"
                       >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                         onChange={this.handleChange}
                         value={this.state.employee.password}
                         name="password"
                        />
                        {this.state.errorMap.password && <div className="alert alert-danger">{this.state.errorMap.password}</div>}
                    </Form.Group>
                    
                </Form.Row>

                <Form.Group controlId="formGridAddress1"
                   >
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St"
                     onChange={this.handleChange}
                     value={this.state.employee.address}
                     name="address"
                    />
                     {this.state.errorMap.address && <div className="alert alert-danger">{this.state.errorMap.address}</div>}
                </Form.Group>
               
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirstName"
                        >
                        <Form.Label>Mobile number</Form.Label>
                        <Form.Control type="text" placeholder="01000001254"
                        onChange={this.handleChange}
                        value={this.state.employee.mobileNumber}
                        name="mobileNumber"
                        />
                        {this.state.errorMap.mobileNumber && <div className="alert alert-danger">{this.state.errorMap.mobileNumber}</div>}
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="formGridLastName"
                        >
                        <Form.Label>Home number</Form.Label>
                        <Form.Control type="text" placeholder="0355598725"
                        onChange={this.handleChange}
                        value={this.state.employee.homeNumber}
                        name="homeNumber"
                        />
                        {this.state.errorMap.homeNumber && <div className="alert alert-danger">{this.state.errorMap.homeNumber}</div>}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridLastName"
                        >
                        <Form.Label>Sallary</Form.Label>
                        <Form.Control type="text" placeholder="..."
                        onChange={this.handleChange}
                        value={this.state.employee.sallary}
                        name="sallary"
                        />
                        {this.state.errorMap.sallary && <div className="alert alert-danger">{this.state.errorMap.sallary}</div>}
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Title</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Department</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
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