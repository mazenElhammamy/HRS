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

module.exports = departmentRouter