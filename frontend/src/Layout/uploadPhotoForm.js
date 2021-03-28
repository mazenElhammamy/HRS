import React, { Component } from 'react';
import { formButton } from "../utils/formUtils"
import { Form } from 'react-bootstrap'
import * as EmployeeActions from '../Actions/EmployeeActions'
export default class UploadPhotoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uploadPhoto : null,
        }
        this.updateHandler = this.updateHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }




handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
		data.append('file', this.state.uploadPhoto);
        EmployeeActions.uploadPhoto(data)
		this.props.handleClose()

}




updateHandler = (event) => {
    this.setState({
        uploadPhoto: event.target.files[0],
        loaded: 0,
    });
};
render() {
    return (

        <Form onSubmit={this.handleSubmit}>
            <Form.Group>
                <Form.File id="exampleFormControlFile1" label="" onChange={this.updateHandler} />
            </Form.Group>
            {formButton("UPDATE")}
        </Form>


    )
}

}