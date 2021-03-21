
import React, { Component } from 'react';
import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';
import AddEmployee from './Components/AddEmployee';
import { Switch, Route } from 'react-router-dom';
import AddDepartment from './Components/AddDepartment';
import AllDepartments from './Components/AllDepartments';
import SignIn from './Components/SignIn';
import Home from './Components/Home';
import AddTitle from './Components/AddTitle';
import AllEmployee from './Components/AllEmployee';
import EditEmployee from './Components/EditEmployee';
import Profile from './Components/EmployeeProfile';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EmployeeStore from './Store/employeeStore';



export default class App extends Component {


	componentDidMount(){
		if (localStorage.getItem('token')){
			EmployeeStore.setLoggedIn();
		}
	}
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
						<Route exact path="/allEmployees" component={AllEmployee} />
						<Route exact path="/signIn" component={SignIn} />
						<Route exact path="/home"  component={Home} /> 
						<Route exact path="/editEmployee" component={EditEmployee} />
						<Route exact path="/employeeProfile" component={Profile} />
					</Switch>
				</div>
				<div id="footer" >
					<Footer />
				</div>
			</div>
		);
	}
}
