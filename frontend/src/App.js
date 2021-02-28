
import React, { Component } from 'react';
import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';
import Home from './Components/Home';
import AddEmployee from './Components/AddEmployee';
import { Switch, Route } from 'react-router-dom';
import AddDepartment from './Components/AddDepartment';
import AllDepartments from './Components/AllDepartments';
import SignIn from './Components/SignIn';
import EmployeeHome from './Components/EmployeeHome';
import AddTitle from './Components/AddTitle';

export default class App extends Component {

	render() {
		return (
			<div className="App" id="page-container">
				<div id="content-wrap">
					<Navbar />
					<Switch>
						<Route exact path="/addEmployee" component={AddEmployee} />
						<Route exact path="/" component={Home} />
						<Route exact path="/addDepartment" component={AddDepartment} />
						<Route exact path="/addTitle" component={AddTitle} />
						<Route exact path="/allDepartment" component={AllDepartments} />
						<Route exact path="/signIn" component={SignIn} />
						<Route exact path="/employeeHome" component={EmployeeHome} />
					</Switch>
				</div>
				<div id="footer" >
					<Footer />
				</div>
			</div>
		);
	}
}
