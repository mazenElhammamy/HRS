import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import * as EmployeeActions from "../Actions/EmployeeActions"
import EmployeeStore from './../Store/employeeStore';
import { RiProfileLine } from "react-icons/ri";
import { FaPlus, FaTrashAlt, FaRegEdit } from "react-icons/fa";




export default class AllEmployee extends Component {
    constructor() {
        super()
        this.state = {
            employees: []
        }
        this.editEmployee = this.editEmployee.bind(this)
        this.getTableRows = this.getTableRows.bind(this)
        this.getEmployees = this.getEmployees.bind(this)
    }

    componentDidMount() {
        EmployeeActions.getAllEmployees();
        EmployeeStore.on("change", this.getEmployees);
    }


    getTableRows() {
        const rows = [];
        this.state.employees.map((employee) => {
            const obj = {
                id: employee._id,
                firstname: employee.firstname,
                lastname: employee.lastname,
                mobileNumber: employee.mobileNumber,
                fullname: employee.fullname,
                email: employee.email,
                password: employee.password,
                homeNumber: employee.homeNumber,
                sallary: employee.sallary,
                address: employee.address,
                departmentName: employee.department[0] ? employee.department[0].departmentName : null,
                titleName: employee.jobTitle[0].titleName,
                mangerId: employee.mangerId,
            }
            rows.push(obj);
        })
        return rows;
    }
    editEmployee(employee) {
        this.props.history.push({
            pathname: '/employeeProfile',
            state: { employee },
        })

    }
   
    getEmployees() {
        this.setState({ employees: EmployeeStore.getAll() })
    }
    componentWillUnmount() {
        EmployeeStore.removeListener("change", this.getEmployees);
        // remove listener to change event
    }
    render() {
        let iconStyles = { fontSize: "1.5em", cursor: "pointer", marginLeft: "30px" };
        const columns = [
            { field: 'firstname', headerName: 'First name', width: 150 },
            { field: 'lastname', headerName: 'Last name', width: 150 },
            { field: 'mobileNumber', headerName: 'Mobile', width: 150 },
            { field: 'departmentName', headerName: 'Department', width: 150 },
            { field: 'titleName', headerName: 'Job Title', width: 200 },

            {
                field: 'profile', headerName: 'Actions', width: 300, renderCell: (params) => (
                    <strong>
                        <RiProfileLine onClick={() => this.editEmployee(params.row)} style={iconStyles} />
                        <FaRegEdit onClick={() => this.editEmployee(params.row)} style={iconStyles} />
                        <FaTrashAlt onClick={() => this.editEmployee(params.row)} style={iconStyles} />


                    </strong>
                )
            }
        ];

        return (

            <div style={{ height: 430, width: '100%' }} className='container mt-10 pb-5 '>
                <a href="/addEmployee"><FaPlus /> add new employee </a>
                <DataGrid rows={this.getTableRows()} columns={columns} pageSize={5} />
            </div>


        )
    }
}



