const { Router } = require('express')
const departmentRouter = Router()
const Department = require('../models/Department')




departmentRouter.post('/addDepartment', async (req, res, next) => {
    try {
        const { body } = req;
        const department = new Department(body);
        await department.save()
        res.status(200).json({ status: "successful department adding" })
        return
    } catch {
        res.status(400).json({ status: "failed to add department" })
        return

    }
});


departmentRouter.get('/getAllDepartment', async (req, res, next) => {
    try {
        const departments = await Department.find()
        res.status(200).json({ status: "successful get departments",departments:departments })
        return
    } catch {
        res.status(400).json({ status: "failed to get departments" })
        return

    }
});

departmentRouter.post('/deleteDepartment', async (req, res, next) => {
    try {  
        const departmentId = req.body._id
      await Department.findOneAndDelete({ _id: departmentId });
        res.status(200).json({ status: "successful delete department"})
        return
    } catch {
        res.status(400).json({ status: "failed to delete departments" })
        return

    }
});
module.exports = departmentRouter