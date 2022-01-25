// const { validateUser } = require("./userHelpers");
// const {logRequest} = require('./generalHelpers')
// const { v4: uuidv4 } = require("uuid");
// const { validateUser } = require("./userHelpers");

const express = require('express')
const fs = require('fs')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const userRouter = require('./routers/usersRouter')
var jwt = require('jsonwebtoken');
require('./connectDB')

// const student  = require('./models/std.js')
// const serverConfig= require('./configUser.js')


app.use(bodyParser.json())


app.use('/users',userRouter);


app.use((err,req,res,next)=>{
  if(err.status>=500){
    console.log(err.internalMessage);
    return res.status(500).send({error:"internal server error"})
  }
  res.status(err.status).send(err.message)
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



















/*
https://www.youtube.com/playlist?list=PLdRrBA8IaU3Xp_qy8X-1u-iqeLlDCmR8a
Fork the project 
git clone {url}
npm i

Done 
Create server with the following end points :
POST /users with uuid, unique username ******************
PATCH /users/id **************************
complete middleware for validating user*******************
Create Route For users ***************************
Create Error handler ***********************
GET /users with age filter *********************
GET /users/id   200,   eror:404********************
POST /users/login /sucess 200 , error:403***************
DELETE users/id  200,    error:404********************
Bonus
If age is not sent return all users*****************
Edit patch end point to handle the sent data only***********








git add .
git commit -m "message"
git push
*/
