import React, { Component } from 'react';
import { Table } from "react-bootstrap"
import DepartmentStore from './../Store/departmentStore';
import * as DepartmentActions from "../Actions/DepartmentActions"
export default class AllDepartments extends Component {
    constructor() {
        super()
        this.state = {
            departments: []
        }
        // this.deleteDepartment = this.deleteDepartment.bind(this)
    }

    componentDidMount(){
        DepartmentActions.getAllDepartment();
        DepartmentStore.on("change", () => {
            this.setState({ departments: DepartmentStore.getAll() });
        })
    }
    deleteDepartment(id){
        DepartmentActions.deleteDepartment(id);
        DepartmentActions.getAllDepartment();
        DepartmentStore.on("change", () => {
            this.setState({ departments: DepartmentStore.getAll() });
        })
    }
    // editDepartment(id){
    //     console.log("id from edit",id)
        
    // }
    render() {
        return (
            <div className='container mt-10' >
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Department Name</th>
                            <th>Department Manger</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.departments.map((department) => {
                            return (
                                <tr key={department._id}>
                                    <td>{department.departmentName}</td>
                                    <td>{department.departmentManger}</td>
                                    <td >
                                        <div className="d-flex">
                                            <div className="mr-3" style={{ cursor: 'pointer' }}  >
                                                <i className="fas fa-edit" ></i>
                                            </div>
                                            <div style={{ cursor: 'pointer' }} onClick={() => this.deleteDepartment(department._id)} >
                                                <i className="fas fa-trash-alt " ></i>
                                            </div>
                                        </div>
                                    </td>

                                </tr>
                            )
                        })}


                    </tbody>
                </Table>

            </div>
        )
    }
}