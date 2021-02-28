import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import DepartmentStore from './../Store/departmentStore';
import * as DepartmentActions from "../Actions/DepartmentActions"
import * as TitleActions from "../Actions/TitleActions"
const initialState = {
    title: {
        titleName: "",
        departmentId: '',
        hierarchyNumber: null
    },
    hierarchyNumber:[0,1,2,3,4,5,6],
    departments: []
};

export default class AddTitle extends Component {
    constructor() {
        super()
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        DepartmentActions.getAllDepartment();
        DepartmentStore.on("change", () => {
            this.setState({ departments: DepartmentStore.getAll() });
        })
    }
    handleChange(e) {
        let title = { ...this.state.title };
        title[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ title });
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.title)
        const title = this.state.title
        TitleActions.createTitle(title);
            this.props.history.push('/employeeHome');
    };
    render() {
        return (
            <Form className='container mt-10' onSubmit={this.handleSubmit} >
                <h2 className="h3 mb-4 page-title">Add Title</h2>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirstName"
                    >
                        <Form.Label>Title Name</Form.Label>
                        <Form.Control type="text" placeholder="title name"
                            onChange={this.handleChange}
                            value={this.state.title.titleName}
                            name="titleName" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Department</Form.Label>
                        <select  className="form-control" aria-label="Default select example"
                            id="departmentId" value={this.state.title.departmentId} onChange={this.handleChange}  name="departmentId" >
                            <option >Choose from these departments:</option>
                            {this.state.departments.map((department) => {
                                return (
                                    <option key={department._id} value={department._id}>{department.departmentName}</option>
                                )
                            })}
                        </select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formHierarchyNumber">
                        <Form.Label>Hierarchy Number</Form.Label>
                        <select  className="form-control" aria-label="Default select example"
                            id="hierarchyNumber" value={this.state.title.hierarchyNumber} onChange={this.handleChange}  name="hierarchyNumber" >
                            <option >Choose from these numbers:</option>
                            {this.state.hierarchyNumber.map((number) => {
                                return (
                                    <option key={number} value={number}>{number}</option>
                                )
                            })}
                        </select>
                    </Form.Group>

                </Form.Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        )
    }
}