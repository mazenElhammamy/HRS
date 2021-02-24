import React, { Component } from 'react';
import { Link as LinkR } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';
import { animateScroll as scroll } from 'react-scroll';


export default class NavBar extends Component {
	render() {
		let buttons;	
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
		
		return (
			<nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
				<div className="container">
                    
                    <a className='navbar-brand' href='#' ><img className='logo' src="./img/logo.jpg"  /></a>
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
