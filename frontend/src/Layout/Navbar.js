import React, { Component } from 'react';
import { Link as LinkR } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';
import { animateScroll as scroll } from 'react-scroll';
import EmployeeStore from './../Store/employeeStore';


export default class NavBar extends Component {
	constructor(){
		super();
		this.state = {
			loggedIn: false 
		}
		this.logout = this.logout.bind(this);
	}

	logout(){
		EmployeeStore.logout();
	};

	componentDidMount() {
		EmployeeStore.getLoggedIn();
        EmployeeStore.on("change", () => {
            this.setState({ loggedIn: EmployeeStore.getLoggedIn() });
        });
    }

	render() {
		let buttons;
		if(this.state.loggedIn)	{
			buttons = (
			<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<LinkR className="nav-link" to="/home">
							Home
						</LinkR>
					</li>

					<li className="nav-item">
							<LinkR className="nav-link" to="/employeeProfile">
								My Profile
							</LinkR>
							</li>
							<li className="nav-item">
							<LinkR
								className="nav-link"
								to="/"
								onClick={() => {
									this.logout();
								}}
							>
								Logout
							</LinkR>
							</li>
							
						
				</ul>
				)
		}else{
			buttons = (
				<ul className="navbar-nav ml-auto ">
					<li className="nav-item">
						<LinkR
							to="/"
							onClick={() => {
								scroll.scrollToTop();
							}}
							className="nav-link"
							style={{ cursor: 'pointer' }}
						>
							Home
						</LinkR>
					</li>
					
					<li className="nav-item">
						<LinkS to="who-we-are" smooth={true} duration={1000} offset={-50} className="nav-link" style={{ cursor: 'pointer' }}>
							About
						</LinkS>
					</li>
					<li className="nav-item">
						<LinkR className="nav-link "  to="/signIn" >
							Sign In
						</LinkR>
					</li>	
				</ul>
			);
		}
			
		
		return (
			<nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
				<div className="container">
                    
                    <a className='navbar-brand' href='/home' ><img className='logo' src="./img/logo.jpg"  /></a>
					<button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarCollapse">
						{buttons}
					</div>
				</div>
                
			</nav>
		);
	}
}
