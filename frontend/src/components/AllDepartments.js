import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DepartmentStore from './../Store/departmentStore';
import * as DepartmentActions from "../Actions/DepartmentActions"
import { FaRegTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert';
export default class AllDepartments extends Component {
    constructor() {
        super()
        this.state = {
            departments: []
        }
        this.getDepartments = this.getDepartments.bind(this)
    }

    componentDidMount() {

        DepartmentActions.getAllDepartment();
        DepartmentStore.on("change", this.getDepartments)
    }
    deleteDepartment(id) {
        confirmAlert({
            message: 'Are you sure you want to delete this department.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        DepartmentActions.deleteDepartment(id);
                        DepartmentActions.getAllDepartment();
                        DepartmentStore.on("change", () => {
                            this.setState({ departments: DepartmentStore.getAll() });
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => console.log("no")

                    // alert('Click No')
                }
            ]
        });


    }
    getDepartments() {
        this.setState({ departments: DepartmentStore.getAll() })
    }
    componentWillUnmount() {
        DepartmentStore.removeListener("change", this.getDepartments)
        // remove listener to change event
    }
    render() {
        return (
            <div className='container mt-10' >
                <a href="/addDepartment"><FaPlus /> add new department </a>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Department Name</TableCell>
                                <TableCell >Department Manger</TableCell>
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.departments.map((department) => (
                                <TableRow key={department._id}>
                                    <TableCell >
                                        {department.departmentName}
                                    </TableCell>
                                    <TableCell >{department.departmentManger}</TableCell>
                                    <TableCell >
                                        <FaEdit />
                                        <FaRegTrashAlt onClick={() => this.deleteDepartment(department._id)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>


        )
    }
}




