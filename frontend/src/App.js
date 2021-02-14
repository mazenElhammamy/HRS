
import React, { Component } from 'react';
import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';
import Home from './components/Home';
import AddEmployee from './components/AddEmployee';
import { Switch, Route } from 'react-router-dom';


export default class App extends Component {

	render() {
		return (
			<div className="App" id="page-container">
				<div id="content-wrap">
					<Navbar />
					<Switch>
						<Route exact path="/addEmployee" component={AddEmployee} />
						<Route exact path="/" component={Home} />
					</Switch>
				</div>
				<div id="footer" >
					<Footer />
				</div>
			</div>
		);
	}
}
