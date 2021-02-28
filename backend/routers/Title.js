const { Router } = require('express')
const titleRouter = Router()
const Title = require('../models/JobTitle')
const Department = require('../models/Department')



titleRouter.post('/addTitle', async (req, res, next) => {
    try {
        
        const obj = {
            titleName : req.body.titleName,
            departmentId : req.body.departmentId ,
            hierarchyNumber :req.body.hierarchyNumber
        }
        const title = new Title(obj);
        console.log(title.departmentId)
        await title.save()
        res.status(200).json({ status: "successful title adding" })
        return
    } catch(err) {
        res.status(400).json({ status: "failed to add title" })
        // console.log(err)
        return

    }
});

titleRouter.post('/titleByDepartment', async (req, res, next) => {
    try {
        const titles= await Title.find({ departmentId:req.body.departmentId});
        res.status(200).json({ status: "successful gitting titles",titles:titles })
        return
    } catch(err) {
        res.status(400).json({ status: "failed to git titles" })
        return

    }
});

module.exports = titleRouter