import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import DepartmentStore from './../Store/departmentStore';
import * as DepartmentActions from "../Actions/DepartmentActions"
import * as TitletActions from "../Actions/TitleActions"
const initialState = {
    title: {
        titleName: "",
        departmentName: '',
    },
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
        TitletActions.createTitle(title);
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
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            id="departmentName"
                            value={this.state.title.departmentName}
                            onChange={this.handleChange}
                            name="departmentName"
                            required
                        >

                            <option >Choose from these departments:</option>
                            {this.state.departments.map((department) => {
                                return (
                                    <option key={department._id} value={department.departmentName}>{department.departmentName}</option>
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