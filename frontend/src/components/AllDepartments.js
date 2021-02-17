import React, { Component } from 'react';
import DepartmentStore from './../Store/departmentStore';
import * as DepartmentActions from "../Actions/DepartmentActions"
export default class AllDepartments extends Component {
    constructor(){
        super()
        this.state ={
            departments : []
        }
    }
    
    componentDidMount(){
        DepartmentActions.getAllDepartment();
        DepartmentStore.on("change",()=>{
           this.setState({departments:DepartmentStore.getAll()}) 
        })
    }
    
    render(){
        return(
            <div className='container mt-10' > 
            {this.state.departments.map((department)=>{
               return  <div key={department.id}>{department.departmentName} </div>
            })} 
            </div>
        )
    }
}