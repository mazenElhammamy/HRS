import React, { Component } from 'react';
import { FaRegListAlt, FaLaptop, FaSitemap, FaUsers } from "react-icons/fa";
import EmployeeStore from '../Store/employeeStore';
import Showcase from '../Layout/ShowCase';
import WhoWeAre from '../Layout/WhoWeAre';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false
        }
        this.getLoggedIn = this.getLoggedIn.bind(this)
    }

    handleIconClick(name) {
        switch (name) {
            case "department":
                this.props.history.push("/allDepartment")
                break;
            case "employee":
                this.props.history.push("/allEmployees")
                break;

        }
    }

    getLoggedIn() {
        this.setState({ loggedIn: EmployeeStore.getLoggedIn() });
    }
    componentDidMount() {
        this.getLoggedIn();
        EmployeeStore.on("change", this.getLoggedIn)
    }
    componentWillUnmount() {
        console.log("logedin from home after unmount", this.state.loggedIn)
        EmployeeStore.removeListener("change", this.getLoggedIn);
      
    }

    render() {
        console.log("logedin from home", this.state.loggedIn)
        return (
            <React.Fragment>
                {
                    this.state.loggedIn ?
                        <div className='container mt-10 '>
                            <div className="row">
                                <div className="col text-center">
                                    <FaUsers className="fa-6x icon" onClick={() => this.handleIconClick("employee")} />
                                    <p className='thick'>Employees</p>
                                </div>
                                {/* <div className="col text-center">
                                <FaSitemap className="fa-6x icon" onClick={() => this.handleIconClick("department")} />
                                <p className='thick'>Departments</p>
                            </div> */}
                                <div className="col text-center">
                                    <FaSitemap className="fa-6x icon" onClick={() => this.handleIconClick("department")} />
                                    <p className='thick'>Departments</p>
                                </div>
                            </div>
                            <div className="row mt-10">
                                <div className="col text-center">
                                    <FaRegListAlt className="fa-6x icon  " />
                                    <p className='thick'>Applications</p>
                                </div>
                                {/* <div className="col text-center">  
                                    <FaRegListAlt className="fa-6x icon  " />
                                <p className='thick'>Applications</p>
                            </div> */}
                                <div className="col text-center">
                                    <FaLaptop className="fa-6x icon" />
                                    <p className='thick'>Assets</p>
                                </div>
                            </div>
                        </div>

                        :
                        <div>
                            <Showcase />
                            <WhoWeAre />
                        </div>
                }
            </React.Fragment>



        );
    }
}
