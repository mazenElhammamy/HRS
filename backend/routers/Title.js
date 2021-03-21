const { Router } = require('express')
const titleRouter = Router()
const JobTitle = require('../models/JobTitle')




titleRouter.post('/addTitle', async (req, res, next) => {
    try {  
        const currentHirarchyNumber = req.body.belowTitleHierarchyNumber;
        const obj = {
            titleName :req.body.titleName,
            departmentId : req.body.departmentId ,
            hierarchyNumber :currentHirarchyNumber+1 || 1
        }

        await JobTitle.updateMany(
            {
                departmentId: obj.departmentId,
                hierarchyNumber: { $gt: currentHirarchyNumber}
            },
            {
                $inc: { hierarchyNumber: 1}
            } 
        )
        const newTitle = new JobTitle(obj)
        await newTitle.save()
        res.status(200).json({ status: "successful title adding" })
        return
    } catch(err) {
        res.status(400).json({ status: "failed to add title" })
        return

    }
});

titleRouter.post('/titleByDepartment', async (req, res, next) => {
    try {
        const jobtitles= await JobTitle.find({$or:[{departmentId:req.body.departmentId} ,{departmentId:null}]});
        res.status(200).json({ status: "successful gitting titles",titles:jobtitles })
        return
    } catch(err) {
        res.status(400).json({ status: "failed to git titles" })
        return

    }
});

module.exports = titleRouter