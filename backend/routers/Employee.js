const { Router } = require('express')
const employeeRouter = Router()
const Employee = require('../models/Employee')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const { generate } = require('../helpers/token');


employeeRouter.post('/register', async (req, res, next) => {
  try {
    const { body } = req;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(body.password, salt)
    body.password = hashedPassword;
    const user = new Employee(body);
    await user.save()
    res.status(201).json({ status: "successful registeration" })
    return
  } catch (err) {
    res.status(400).json({ status: "registeration failed chech your inputs", error: err })
    return
  }
})
///////////////////////////////////////////////////////////////////////////
employeeRouter.post('/login', async (req, res, next) => {
  try {
    const { body } = req;
    const user = await Employee.findOne({ email: body.email })
    if (employee) {
      const match = await bcrypt.compare(body.password, user.password)
      if (match) {
        const token = await generate(user._id)
        const respose = {
          user,
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
//////////////////////////////////////////////////////////////////////


module.exports = employeeRouter




