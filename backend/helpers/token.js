const jsonWebToken= require('jsonwebtoken')
const util = require('util')
const signToken= util.promisify(jsonWebToken.sign)
const verifyToken = util.promisify(jsonWebToken.verify)
const secretKey = "HamadaELGenn"


const generate = (employeeId)=>{
    return signToken({employeeId:employeeId},secretKey);

}

const verify = (token) => {
return verifyToken(token,secretKey);
}

module.exports={
    generate,
    verify
}



