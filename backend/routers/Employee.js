const { Router } = require('express')
const employeeRouter = Router()
const Employee = require('../models/Employee')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const Title = require('../models/JobTitle')
const { generate } = require('../helpers/token');


employeeRouter.post('/addNewEmployee', async (req, res, next) => {
console.log(req.body)
  try {
    const { body } = req;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(body.password, salt)
    body.password = hashedPassword;
    const employee = new Employee(body);
    await employee.save()
    res.status(201).json({ status: "successful registeration" })
    return
  } catch (err) {
    console.log(err)
    res.status(400).json({ status: "registeration failed chech your inputs", error: err })
    return
  }
})
///////////////////////////////////////////////////////////////////////////
// employeeRouter.post('/login', async (req, res, next) => {
//   try {
//     const { body } = req;
//     const employee = await Employee.findOne({ email: body.email })
//     if (employee) {
//       const match = await bcrypt.compare(body.password, employee.password)
//       if (match) {
//         const token = await generate(employee._id)
//         const respose = {
//           token,
//           status: 'loggedIn'
//         }
//         res.status(200).json(respose)
//         return
//       } else { // password not match
//         res.status(400).json({ status: 'password is incorrect' })
//         return
//       }
//     } else { // email not match
//       res.status(400).json({ status: 'The email address or password is incorrect ' })
//       return
//     }
//   }
//   catch (err) {
//     res.status(500).json({ status: 'error, try again' })
//     return
//   }
// })
//////////////////////////////////////////////////////////////////////
employeeRouter.post('/findLeaders', async (req, res, next) => {
  console.log(req.body)
    try {
      const titleIds= await Title.find({ departmentId:req.body.departmentId ,hierarchyNumber:{$gt:req.body.hierarchyNumber}}).distinct('_id');
      const leaders = await Employee.find({ titleId: { $in: titleIds} })
      console.log(leaders)
     
      res.status(201).json({ status: "successful registeration" ,leaders:leaders})
      // return
    } catch (err) {
      console.log(err)
      // res.status(400).json({ status: "registeration failed chech your inputs", error: err })
      // return
    }
  })

module.exports = employeeRouter




