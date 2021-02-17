import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import { Schema } from '../Schema/DepartmentFormSchema'
import * as DepartmentActions from "../Actions/DepartmentActions"

const initialState = {
    department: {
        departmentName: "",
        departmentManger: '',

    },
    errorMap:{},
};

export default class AddDepartment extends Component {
    constructor() {
        super()
        this.state = initialState;
    }


    validate = () => {
        const { error } = Schema.validate(this.state.department, { abortEarly: false });
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
        let department = { ...this.state.department };
        department[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ department });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            const errorMap={}
            this.setState({errorMap})
            const department = this.state.department
            console.log(department)
            DepartmentActions.createDepartment(department)
        }
       
    };
    render() {
        return (
            <Form className='container mt-10' onSubmit={this.handleSubmit} >
                <h2 className="h3 mb-4 page-title">Add Department</h2>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirstName"
                    >
                        <Form.Label>Department Name</Form.Label>
                        <Form.Control type="text" placeholder="First name"
                            onChange={this.handleChange}
                            value={this.state.department.departmentName}
                            name="departmentName" />
                        {this.state.errorMap.departmentName && <div className="alert alert-danger">{this.state.errorMap.departmentName}</div>}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Department Manger</Form.Label>
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            id="departmentManger"
                            value={this.state.department.departmentManger}
                            onChange={this.handleChange}
                            name="departmentManger"
                            required
                        >

                            <option selected>Choose from these intakes:</option>

                            <option value="mazen">mazen</option>

                        </select>

                        {/* <Form.Control as="select" defaultValue="Choose..."
                            onChange={this.handleChange}
                            // value={this.state.department.departmentManger}
                            >
                            <option>Choose...</option>
                            <option ></option>
                        </Form.Control> */}
                    </Form.Group>

                </Form.Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        )
    }
}