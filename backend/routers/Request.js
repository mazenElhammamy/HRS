const { Router } = require('express')
const requestRouter = Router()
const Request = require('../models/Request')
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
requestRouter.put('/editRequest', async (req, res, next) => {
    try {
        const { body } = req;
        const request = await Request.findOneAndUpdate({ _id: body.id }, { status: body.status }, {
            new: true
        })
        res.status(201).json({ status: "successful updated", request: { id: request._id, status: request.status } })
        return
    } catch (err) {
        console.log(err)
        res.status(400).json({ status: "update failed chech your inputs", error: err })
        return
    }
})



module.exports = requestRouter