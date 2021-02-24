import React, { Component } from 'react';




export default class EmployeeHome extends Component {

    render() {
        return (
            <div className='container mt-10 ' id='icon'>
                <div className="row">
                    <div className="col text-center">
                   <a href='/allEmployees'> <i class="fas fa-users fa-6x"></i></a>
                    <p className='thick'>Employees</p>
                    </div>
                    <div className="col text-center">
                    <a href='/allDepartment'> <i class="fas fa-sitemap fa-6x"></i></a>
                        <p className='thick'>Departments</p>
                    </div>
                </div>
                <div className="row mt-10">
                    <div className="col text-center">
                    <a href='#'><i class="fas fa-list fa-6x"></i></a>
                        <p className='thick'>Applications</p>
                    </div>
                    <div className="col text-center">
                    <a href='#'><i class="fas fa-laptop fa-6x"></i></a>
                    <p className='thick'>Assets</p>
                    </div>
                </div>
            </div>


        );
    }
}
