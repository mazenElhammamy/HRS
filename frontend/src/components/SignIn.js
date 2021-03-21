import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { addFormGroup, formButton } from "../utils/formUtils"
import * as EmployeeActions from "../Actions/EmployeeActions"
export default class SignIn extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		e.preventDefault();
		EmployeeActions.login(this.state, this.props.history);
		
	}
	handleChange(e) {
        let state = { ...this.state };
        state[e.currentTarget.name] = e.currentTarget.value;
        this.setState(state);
    };
	render() {
		return (
			<div className="container text-center mt-10 ">
					<div className="col-md-4 m-auto">
					<span className="font-weight-bold d-block mb-2">Welcome Back</span>
						<hr className="bottom-border bottom-border-seconadry" />
						<Form  onSubmit={this.handleSubmit} >
							{addFormGroup("formGridEmail", null,"email", this.state.email, "email", this.handleChange, null, "text")}
							{addFormGroup("formGridPassword", undefined,"password", this.state.password, "password", this.handleChange, null, "password")}
							{formButton("Login")}
						</Form>
					</div>
			</div>
		);
	}
}
