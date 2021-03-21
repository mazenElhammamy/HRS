import React, { Component } from 'react';
import { Form } from 'react-bootstrap'
import { addFormGroup, addSelectFormGroup, formButton } from "../utils/formUtils"
import DepartmentStore from './../Store/departmentStore';
import * as DepartmentActions from "../Actions/DepartmentActions"
import * as TitleActions from "../Actions/TitleActions"
import TitleStore from './../Store/titleStore';
import Select from 'react-select';
const initialState = {
    title: {
        titleName: "",
        departmentId: "", //(value, label) use value in BE request
        belowTitleHierarchyNumber: null
    },
    titles: [],
    departments: []
};

export default class AddTitle extends Component {
    constructor() {
        super()
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getDepartmentOptions = this.getDepartmentOptions.bind(this);
        this.selectHandleChange = this.selectHandleChange.bind(this);
        this.getTitles = this.getTitles.bind(this);
        this.getDepartments = this.getDepartments.bind(this)
    }

    componentDidMount() {
        DepartmentActions.getAllDepartment();
        DepartmentStore.on("change",this.getDepartments )
    }
    handleChange(e) {
        let title = { ...this.state.title };
        title[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ title });
    }

    selectHandleChange(selectedOption, name) {
        let title = { ...this.state.title };
        title[name] = selectedOption.value;
        this.setState({ title });
        switch (name) {
            case "departmentId":
                TitleActions.getTitlesByDepartment(selectedOption.value);
                TitleStore.on("change", this.getTitles)
                break;
        }


    }

    handleSubmit(e) {
        e.preventDefault();
        const title = this.state.title
        TitleActions.createTitle(title, this.props.history);

    };

    getDepartmentOptions() {
        var options = []
        this.state.departments.map((department) => {
            const obj = {
                value: department._id,
                label: department.departmentName
            }
            options.push(obj)
        });
        return options;
    }
    getTitleOptions() {
        var options = []
        this.state.titles.map((title) => {
            const obj = {
                value: title.hierarchyNumber,
                label: title.titleName
            }
            options.push(obj)
        });
        return options;
    }
    getTitles() {
        this.setState({ titles: TitleStore.getAll() })
    }
    getDepartments() {
        this.setState({ departments: DepartmentStore.getAll() })
    }
    componentWillUnmount() {
        TitleStore.removeListener("change", this.getTitles)
        DepartmentStore.removeListener("change", this.getDepartments)
        // remove listener to change event
    }
    render() {
        return (
            <Form className='container mt-10' onSubmit={this.handleSubmit} >
                <h2 className="h3 mb-4 page-title">Add Job Title</h2>
                <Form.Row>
                    {
                        addFormGroup("formGridTitleName", "Title Name", "title name", this.state.title.titleName, "titleName", this.handleChange, null, "text")
                    }
                    {
                        addSelectFormGroup("formGridDepartment", "Department", this.state.title.department, this.selectHandleChange, this.state.departments, "_id", "departmentName", "departmentId")
                    }
                    {
                        addSelectFormGroup("formHierarchyNumber", "Below ...", this.state.title.aboveTitle, this.selectHandleChange, this.state.titles, "hierarchyNumber", "titleName", "belowTitleHierarchyNumber")
                    }

                </Form.Row>
                {formButton("Submit")}
            </Form>

        )
    }
}