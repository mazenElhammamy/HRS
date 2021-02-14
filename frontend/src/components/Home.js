import React, { Component } from 'react';
import Showcase from '../Layout/ShowCase';
import WhoWeAre from '../Layout/WhoWeAre';



export default class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <Showcase  />
                <WhoWeAre />
            </React.Fragment>
        );
    }
}
