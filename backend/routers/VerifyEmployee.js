const { Router } = require('express')
const verifyEmployeeRouter = Router()
const Request = require('../models/Request')
const Employee = require('../models/Employee')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

verifyEmployeeRouter.post('/createRequest', async (req, res, next) => {

    try {
        if (req.employeeId) {
            const employee = await Employee.findOne({ _id: req.employeeId })
            const { body } = req;
            body.employeeId = req.employeeId
            body.mangerId = employee.mangerId
            const request = new Request(body);
            const newRequest = await request.save();
            res.status(200).json({ status: "successful request adding", request: newRequest })
            return
        }
        res.status(401).json({ status: 'User not authorized' });
        return;
    } catch {
        res.status(400).json({ status: "failed to add request" })
        return

    }
});

verifyEmployeeRouter.post('/getMyRequests', async (req, res, next) => {

    try {
        if (req.employeeId) {
            const requests = await Request.find({ employeeId: req.employeeId })

            res.status(200).json({ status: "successful getting requests", requests: requests })
            return
        }
        res.status(401).json({ status: 'User not authorized' });
        return;
    } catch (err) {

        res.status(400).json({ status: "failed to get requests" })
        return

    }
});
verifyEmployeeRouter.post('/getMyRequestsApplications', async (req, res, next) => {
    try {
        if (req.employeeId) {

            const requests = await Request.aggregate([
                {
                    $match:
                    {
                        mangerId: { $eq: ObjectId(req.employeeId) }

                    }
                },
                {
                    $lookup: {
                        from: "employees",
                        localField: "employeeId",
                        foreignField: "_id",
                        as: "employee"
                    },
                },
                {
                    $project: {
                        startDate: 1, days: 1,
                        type: 1, reason: 1, appliedOn: 1, status: 1,
                        "employee.fullname": 1
                    }
                },
            ]);
            res.status(200).json({ status: "successful getting requests", requests: requests })
            return
        }
        res.status(401).json({ status: 'User not authorized' });
        return;
    } catch (err) {
        res.status(400).json({ status: "failed to get requests" })
        return;
    }
});


verifyEmployeeRouter.post('/getMyData', async (req, res, next) => {

    try {
        if (req.employeeId) {

            const employee = await Employee.aggregate(
                [
                    {
                        $match:
                        {
                            _id: { $eq: ObjectId(req.employeeId) }

                        }
                    },
                    {
                        $lookup: {
                            from: "departments",
                            localField: "departmentId",
                            foreignField: "_id",
                            as: "department"
                        },
                    },
                    {
                        $lookup: {
                            from: "jobtitles",
                            localField: "titleId",
                            foreignField: "_id",
                            as: "title"
                        },
                    },
                    {
                        $graphLookup: {
                            from: "employees",
                            startWith: "$mangerId",
                            connectFromField: "mangerId",
                            connectToField: "_id",
                            as: "mangers"
                        }
                    },
                    {
                        $addFields: {
                            mangers: {
                                $reverseArray: {
                                    $map: {
                                        input: "$mangers",
                                        as: "m",
                                        in: { "name": "$$m.fullname", "photo": "$$m.photo" }
                                    }
                                }
                            }
                        }
                    },
                    {
                        $project:
                        {
                            firstname: 1, lastname: 1,
                            fullname: 1, email: 1, password: 1, address: 1,
                            mobileNumber: 1, homeNumber: 1, sallary: 1,
                            photo: 1, vacationDays: 1, admin: 1,
                            "department.departmentName": 1,"title.titleName":1,
                            "mangers": 1
                        }
                    }
                ]
            )

            res.status(200).json({ status: "successful getting employee", employee: employee })
            return
        }
        res.status(401).json({ status: 'User not authorized' });
        return;
    } catch (err) {

        res.status(400).json({ status: "failed to get employee" })
        return

    }
});
module.exports = verifyEmployeeRouter