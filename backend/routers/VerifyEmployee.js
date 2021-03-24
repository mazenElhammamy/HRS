const { Router } = require('express')
const verifyEmployeeRouter = Router()
const Request = require('../models/Request')
const Employee = require('../models/Employee')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const path = require('path');
const formidable = require('formidable');
const detect = require('detect-file-type');
const { v4: uuidv4 } = require("uuid");
var mv = require('mv');
mongoose.set('useCreateIndex', true)
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
                            as: "mangers",

                        }

                    },
                    {
                        $addFields:
                        {
                            mangers: {
                                $reverseArray: {
                                    $map: {
                                        input: "$mangers",
                                        as: "m",
                                        in: { "id": "$$m._id" }
                                    }
                                },
                            }
                        },

                    },

                    {
                        $project:
                        {
                            firstname: 1, lastname: 1,
                            fullname: 1, email: 1, password: 1, address: 1,
                            mobileNumber: 1, homeNumber: 1, sallary: 1,
                            photo: 1, vacationDays: 1, admin: 1,
                            "department.departmentName": 1, "title.titleName": 1,
                            "mangers": 1



                        }
                    }
                ]
            )
          const  ids = employee[0].mangers.map(function(manger) { return mongoose.Types.ObjectId(manger.id) })
            const mangers = await Employee.aggregate(
                [
                    { "$match": { "_id": { "$in": ids } } },
                    {
                        $lookup: {
                            from: "jobtitles",
                            localField: "titleId",
                            foreignField: "_id",
                            as: "title"
                        },
                    },


                    {
                        $project:
                        {
                            _id: 1,
                            fullname: 1,
                            photo: 1,
                             "title.titleName": 1,
                             "title.hierarchyNumber": 1

                        }
                    }
                ]
            )

            res.status(200).json({ status: "successful getting employee", employee: employee, mangers: mangers })
            return
        }
        res.status(401).json({ status: 'User not authorized' });
        return;
    } catch (err) {
        console.log(err)
        res.status(400).json({ status: "failed to get employee" })
        return
    }
});

verifyEmployeeRouter.put('/uploadPhoto', async (req, res, next) => {
    try {
        if (req.employeeId) {

            const employee = await Employee.findById(req.employeeId)


            var form = new formidable.IncomingForm();

            form.parse(req, function (err, fields, files) {
                if (err) {

                    res.status(400).json({ status: 'error while uploading photo', error: err })
                    return;
                } else {
                    detect.fromFile(files.file.path, (err, result) => {
                        const photoName = uuidv4() + "." + result.ext

                        const allowedImageTypes = ["jpg", "jpeg", "png"]
                        if (!allowedImageTypes.includes(result.ext)) {
                            res.status(400).json({ status: 'Image not allowed' })
                            return
                        }
                        const olldPath = files.file.path
                        const newPath = path.join(__dirname, "..", "..", "Frontend", "public", 'uploadedPhotos', photoName)
                        mv(olldPath, newPath, async (err) => {
                            if (err) {
                                res.status(400).json({ status: 'error while uploading photo', error: err })
                                return;
                            } else {
                                employee.photo = photoName;
                                const updatedEmployee = await new Employee(employee)
                                await Employee.updateOne({ _id: updatedEmployee._id }, updatedEmployee)
                                res.status(200).json({ status: 'successeful update photo', employee: updatedEmployee });
                                return
                            }
                        })
                    })
                }
            });
            return
        } else {
            res.status(401).json({ status: 'User not authorized' });
            return
        }
    }
    catch (error) {
        res.status(500).json({ status: 'Failed to update user data' })
        return
    }
})
module.exports = verifyEmployeeRouter