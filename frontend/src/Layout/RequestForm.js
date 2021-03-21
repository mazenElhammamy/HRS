import React, { Component } from 'react';
import { addFormGroup, addSelectFormGroup, formButton } from "../utils/formUtils"
import { Form } from 'react-bootstrap'
import * as RequestActions from '../Actions/RequestActions'
export default class RequestForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            request: {
                startDate: "",
                endDate: "",
                days: null,
                type: "",
                reason: "",
                appliedOn: new Date,
                status: "pending..."

            },
            requestsTypes: [{ id: 1, type: "Vacation" }, { id: 2, type: "Sick" }]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }
    handleSubmit(e){
        e.preventDefault();
        var date1 = new Date(this.state.request.startDate); 
        var date2 = new Date(this.state.request.endDate);
        var Difference_In_Time = date2.getTime() - date1.getTime(); 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
        let request = { ...this.state.request };
        request.days =  Difference_In_Days 
        request.appliedOn = request.appliedOn.toLocaleString()
        RequestActions.createRequest(request)
        this.props.handleClose()
    }
   
    handleChange(e){
        let state = { ...this.state.request };
        state[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ request: state });
    }
    handleSelectChange(selectedOption, name){

        let request = { ...this.state.request };
        request[name] = selectedOption.value;
        this.setState({ request })
    
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit} >
                <Form.Row>
                    {addFormGroup("formGridStartDate", "Start", null, this.state.request.startDate, "startDate", this.handleChange, null, "date")}
                    {addFormGroup("formGridEndDate", "End", null, this.state.request.endDate, "endDate", this.handleChange, null, "date")}
                </Form.Row>
                <Form.Row>
                    {addSelectFormGroup("formGridRequests", "Type", this.state.request.type, this.handleSelectChange, this.state.requestsTypes, "type", "type", "type")}
                </Form.Row>
                <Form.Row>
                    {addFormGroup("formGridDateReason", "Reason", null,this.state.request.reason, "reason", this.handleChange,  null, "text")}
                </Form.Row>
                {formButton("Submit")}
            </Form>

        )
    }
}
