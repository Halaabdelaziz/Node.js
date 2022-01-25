var jwt = require('jsonwebtoken')
const {secret} = require('./configUser.js')
const student = require('./models/std.js')



const authentication = async (req,res,next)=>{
    const token = req.headers.token
    try{
        const decoded = jwt.verify(token,secret)
        req.student= await student.findById(decoded.id)
        return next();
    }catch(error){
        next({status:401,message:"Authentication error"})
    }
}
module.exports={
    authentication
}