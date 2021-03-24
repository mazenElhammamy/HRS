import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import RequestFormPopup from './RequestFormPopup';
import { InputLabel } from '@material-ui/core';
import * as RequestActions from '../Actions/RequestActions'
import RequestStore from '../Store/requestStore';
export default class MyLeave extends Component {
    constructor() {
        super()
        this.state = {
            myRequests: []
        }
        this.getTableRows = this.getTableRows.bind(this);
        this.getRequests = this.getRequests.bind(this);
    }

    componentDidMount() {
        RequestActions.getMyRequests()
        RequestStore.on("change", this.getRequests);
    }
    componentWillUnmount() {
        RequestStore.removeListener("change", this.getRequests);
    }
    getRequests() {
        this.setState({ myRequests: RequestStore.getAll() })
    }

    getTableRows() {
        const rows = [];
        
        this.state.myRequests.map((request) => {
            const obj = {
                id: request._id,
                date: request.startDate,
                days: request.days,
                type: request.type,
                reason: request.reason,
                appliedOn: request.appliedOn,
                status: request.status,

            }
            rows.push(obj);
        });
        return rows;
    }

    render() {

        const columns = [
            { field: 'date', headerName: 'Date', width: 150 },
            { field: 'days', headerName: 'Days', width: 150 },
            { field: 'type', headerName: 'Type', width: 200 },
            { field: 'reason', headerName: 'Reason', width: 200 },
            { field: 'appliedOn', headerName: 'Applied On', width: 150 },
            { field: 'status', headerName: 'Status', width: 150 },


        ];
        return (
            <div className="container">
                <RequestFormPopup x="myLeves" />
                <InputLabel>My Leaves</InputLabel>
                <div style={{ height: 320, width: '100%' }} >
                    <DataGrid rows={this.getTableRows()} columns={columns} pageSize={3} />
                </div>
            </div>
        )
    }

}

