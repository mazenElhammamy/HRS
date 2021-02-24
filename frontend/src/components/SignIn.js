import React, { Component } from 'react';
export default class SignIn extends Component {
	
	handleSubmit=()=>{
		this.props.history.replace('/employeeHome');
	}

	render() {
		return (
			<div className="container text-center mt-10">
				<div className="row">
					<div className="col-md-4 m-auto">
						<h1 className="modal-title w-100 font-weight-bold">   
                            <img className='logo' src="./img/logo.jpg"  />
						</h1>
						<hr className="bottom-border bottom-border-seconadry" />

						<span className="font-weight-bold d-block mb-2">Welcome Back</span>

						<form onSubmit={this.handleSubmit}>
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Email" name="email"  required />
							</div>
						
							<div className="form-group">
								<input type="password" className="form-control" placeholder="Password" name="password"  required />
							</div>
							<div className="form-group">
								<button type="submit" className="btn btn-dark btn-block rounded-pill">
									Login
								</button>
							</div>
							
						</form>
					</div>
				</div>
			</div>
		);
	}
}
