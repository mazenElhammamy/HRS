import React, { Component } from 'react';
import { Form } from 'react-bootstrap'
import { Schema } from '../Schema/DepartmentFormSchema'
import * as DepartmentActions from "../Actions/DepartmentActions"
import { addFormGroup, addSelectFormGroup,formButton } from "../utils/formUtils"

const initialState = {
    department: {
        departmentName: "",
        departmentManger: "admin",

    },
    errorMap: {},
};

export default class AddDepartment extends Component {
    constructor() {
        super()
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectDepartmentMangerChange = this.selectDepartmentMangerChange.bind(this);
        this.getDepartmentMangersOptions = this.getDepartmentMangersOptions.bind(this);
    }


    validate(){
        const department ={
            departmentName :this.state.departmentName
        }
        const { error } = Schema.validate(department, { abortEarly: false });
        const errorMap = {};
        if (error) {
            error.details.forEach(errorDetails => {
                const key = errorDetails.context.key;
                errorMap[key] = errorDetails.message;
            });
            this.setState({ errorMap })
            return false;
        }
        return true;
    };
    handleChange(e) {
        let department = { ...this.state.department };
        department[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ department });
    };

    handleSubmit(e) {
        e.preventDefault();
        const department = this.state.department
        DepartmentActions.createDepartment(department,this.props.history)
    };
    selectDepartmentMangerChange(selectedOption, name){
        let department = { ...this.state.department };
        department[name] = selectedOption.value;
        this.setState({ department });
    }
    getDepartmentMangersOptions() {
         const obj =[
            {
                value: "admin",
                label: "admin"
            },
            {
                value: "admin2",
                label: "admin2"
            }
         ] 
           
        return obj;
    }
    
    render() {
        return (
            <Form className='container mt-10' onSubmit={this.handleSubmit} >
                <h2 className="h3 mb-4 page-title">Add Dertment</h2>
                <Form.Row>
               {addFormGroup("formGridDepartmentName", "Department Name","department name", this.state.department.departmentName, "departmentName", this.handleChange , null, "text") }
                </Form.Row>
                {formButton("Submit")}
            </Form>

        )
    }
}