const token= require('../helpers/token') 

const verifyEmployee = async(req,res,next)=>{
    
    const {authorization} = req.headers
    
    if(authorization){
        try{
            const payload = await token.verify(authorization) // payload ={userId, time}
            req.employeeId = payload.employeeId; // token is correct and add userId to request
            next() 
            return 
        }catch(error){ // if token not correct
            next() 
            return 
        }
    }
    next(new Error('not verified'))
}
module.exports = verifyEmployee