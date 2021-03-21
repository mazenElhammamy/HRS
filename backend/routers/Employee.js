const { Router } = require('express')
const employeeRouter = Router()
const Employee = require('../models/Employee')
const Title = require('../models/JobTitle')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const { generate } = require('../helpers/token');


employeeRouter.post('/addNewEmployee', async (req, res, next) => {
  try {
    const { body } = req;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(body.password, salt)
    body["password"]=hashedPassword;
    const employee = await new Employee(body);
    await employee.save()
    res.status(201).json({ status: "successful registeration" })
    return
  } catch (err) {
    console.log(err)
    res.status(400).json({ status: "registeration failed chech your inputs", error: err })
    return
  }
})


employeeRouter.post('/login', async (req, res, next) => {
  try {
    const { body } = req;
    const employee = await Employee.findOne({ email: body.email })
    if (employee) {
      const match = await bcrypt.compare(body.password, employee.password)
      if (match) {
        const token = await generate(employee._id)
        const respose = {
          employee,
          token,
          status: 'loggedIn'
        }
        res.status(200).json(respose)
        return
      } else { // password not match
        res.status(400).json({ status: 'password is incorrect' })
        return
      }
    } else { // email not match
      res.status(400).json({ status: 'The email address or password is incorrect ' })
      return
    }
  }
  catch (err) {
    res.status(500).json({ status: 'error, try again' })
    return
  }
})

employeeRouter.put('/editEmployee', async (req, res, next) => {
  console.log(req.body)
  try {
    const { body } = req;
    const employee = new Employee(body);
    await Employee.updateOne({ _id: employee._id }, employee)
    res.status(201).json({ status: "successful updated" })
    return
  } catch (err) {
    console.log(err)
    res.status(400).json({ status: "update failed chech your inputs", error: err })
    return
  }
})


employeeRouter.post('/findLeaders', async (req, res, next) => {
  try {
    const title = await Title.findById(req.body.titleId)
    const titleIds = await Title.find({ $or:[{departmentId:title.departmentId} ,{departmentId:null}], hierarchyNumber: { $lt: title.hierarchyNumber } }).distinct('_id');
    const leaders = await Employee.find({ titleId: { $in: titleIds } })
    res.status(201).json({ status: "successful get leaders", leaders: leaders })
    return
  } catch (err) {
    res.status(400).json({ status: " failed to get leaders", error: err })
    return
  }
  })

  employeeRouter.get('/getAllEmployees', async (req, res, next) => {
    try {

    const employees =  await Employee.aggregate([
        {
          $lookup : {
            from : "departments",
            localField : "departmentId",
            foreignField : "_id",
            as:"department"
          }
        },
        {
          $lookup : {
            from : "jobtitles",
            localField : "titleId",
            foreignField : "_id",
            as:"jobTitle"
          }
        },
        {
          $project : {firstname:1 ,lastname:1 ,fullname:1,
            email:1, password:1,mobileNumber:1, homeNumber:1,sallary:1, address:1,
            "department.departmentName":1,"jobTitle.titleName":1
        }
      }
      ]
      );
      
      res.status(201).json({ status: "successful get employyes", employees: employees })
      return
    } catch (err) {
      console.log(err)
      res.status(400).json({ status: " failed to get employees", error: err })
      return
    }
    })
  
module.exports = employeeRouter




