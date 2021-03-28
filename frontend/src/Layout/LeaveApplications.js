import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { InputLabel } from '@material-ui/core';
import * as RequestActions from '../Actions/RequestActions'
import RequestStore from '../Store/requestStore';
import { Badge } from 'reactstrap';
export default class MyLeaves extends Component {
    constructor() {
        super()
        this.state = {
            myRequests: []
        }
        this.getTableRows = this.getTableRows.bind(this);
        this.getRequests = this.getRequests.bind(this);
        
    }

    componentDidMount() {
        RequestActions.getMyRequestsApplications()
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
                employee:request.employee[0].fullname,
                startDate: request.startDate,
                days: request.days,
                type: request.type,
                reason: request.reason,
                appliedOn: request.appliedOn,
                status: request.status,
               
            }
            rows.push(obj);
        })
        return rows;
    }


    editRequest(id,status){
       const obj ={
           id : id ,
           status : status
       }
       RequestActions.editRequest(obj)
    }
   
    render() {
        let iconStyles = {fontSize: "0.8em", marginRight:"20px"};
        const columns = [
            { field: 'startDate', headerName: 'Start Date', width: 150 },
            { field: 'employee', headerName: 'Employee', width: 150 },
            { field: 'days', headerName: 'Days', width: 100 },
            { field: 'type', headerName: 'Type', width: 150 },
            { field: 'reason', headerName: 'Reason', width: 200 },
            { field: 'appliedOn', headerName: 'Applied On', width: 150 },
            { field: 'status', headerName: 'Status', width: 150 },
            {
                field: 'actions', headerName: 'Actions', width: 200, renderCell: (params) => (  
                    <strong>      
                        <Badge href="#" color="secondary" style={iconStyles} onClick={() => this.editRequest(params.row.id,"Approved")} >Approve</Badge>
                        <Badge href="#" color="dark" style={iconStyles} onClick={() => this.editRequest(params.row.id,"Rejected")}  >Reject</Badge>
                        <Badge href="#" color="danger" style={iconStyles}   >Delete</Badge>
                        </strong>                      
                )
            } 

        ];
        return (
            <div >
                <InputLabel>Leave Applications</InputLabel>
                <div style={{ height: 320, width: '100%' }} >
                    <DataGrid rows={this.getTableRows()} columns={columns} pageSize={3} />
                </div>
            </div>
        )
    }

}
