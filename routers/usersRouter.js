const fs = require("fs");
const { validateUser } = require("../userHelpers");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const serverConfig= require('../configUser.js')
// const { json } = require("body-parser");
const { authentication } = require("../authentication.js");
const student  = require('../models/std')
var ObjectId = require('mongodb').ObjectId; 

router.post("/", async (req, res, next) => {
  try {
    const { stdname, age, password } = req.body;
    const std = new student({stdname,age,password})
    await std.save()
    // const data = await fs.promises
    //   .readFile("./user.json", { encoding: "utf8" })
    //   .then((data) => JSON.parse(data));
    // const id = uuidv4();
    // data.push({ id, username, age, password });
    
    // await fs.promises.writeFile("./user.json", JSON.stringify(data), {
    //   encoding: "utf8",
    // });
    res.send({message: "sucess" });
  } catch (error) {
    next({ status: 500, internalMessage: error.message });
  }
});

router.post("/login",async (req, res, next) => {
  try {
    const { stdname, password } = req.body;
    const std = await student.findOne({ stdname });
    if (!std)
      return next({ status: 401, message: "stdname or password is incorrect" });
    if (std.password !== password)
      next({ status: 401, message: "stdname or password is incorrect" });
    const payload = { id: std.id, stdname: std.stdname };
    const token = jwt.sign(payload, configUser.secret, { expiresIn: "1d" });

    return res.status(200).send({ message: "Logged in Successfully", token });
    // const test = req.body.username;
    // const Data = await fs.promises
    //   .readFile("./user.json", { encoding: "utf8" })
    //   .then((data) => JSON.parse(data));
    // const userexist = Data.find((user) => user.username === test);
    // console.log(userexist);
    // if (!userexist)
    //   return next({ status: 403, internalMessage: error.message });
    // const payload = { id: userexist.id, username: userexist.username };
    // const token = jwt.sign(payload, serverConfig.secret,{expiresIn:"1d"});
    // res.status(200).send({message:"validation",token});
  } catch (error) {
    console.log(error);
    next({ status: 403, internalMessage: error.message });
  }
});

router.get("/",authentication, async (req, res, next) => {
  try {

    if (!age) {
      let test = await student.find({});
      console.log(test);
      res.send(test);
    }
    const age = Number(req.query.age); 
    const result = await student.find({age:age});
    res.send(result);
    // const users = await fs.promises
    //   .readFile("./user.json", { encoding: "utf8" })
    //   .then((data) => JSON.parse(data));
    // const filteredUsers = users.filter((user) => user.age === age);
  } catch (error) {
    next({ status: 500, internalMessage: error.message });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    var id = req.params.id;  
    var o_id = new ObjectId(id);
    const test =await student.find({_id:o_id})
    // const users = await fs.promises
    //   .readFile("./user.json", { encoding: "utf8" })
    //   .then((data) => JSON.parse(data));
    // const filterUsers = users.filter((x) => x.id === id);
    // console.log(filterUsers);
    res.status(200).send(test);
  } catch (error) {
    next({ status: 404, internalMessage: error.message });
  }
});

router.patch("/:userId", authentication , async (req, res, next) => {
  if(req.user.id!==req.params.userId) next({status:403, message:"Authorization error"})
  try {
    const {password, age} = req.body
    req.user.password = password
    req.user.age = age
    await req.user.save()
    res.send("sucess")
  } catch (error) {

  }
  // try {
  //   const { username, password, age } = req.body;
  //   const myFile = await fs.promises
  //     .readFile("./user.json", { encoding: "utf-8" })
  //     .then((data) => JSON.parse(data));
  //   const updateUsers = myFile.map((user) => {
  //     if (user.id === req.params.userId) {
  //       if (req.body.username) {
  //         return {
  //           username,
  //           age: user.age,
  //           password: user.password,
  //           id: req.params.userId,
  //         };
  //       } else if (req.body.password) {
  //         return {
  //           username: user.username,
  //           age: user.age,
  //           password,
  //           id: req.params.userId,
  //         };
  //       } else if (req.body.age) {
  //         return {
  //           username: user.username,
  //           age,
  //           password: user.password,
  //           id: req.params.userId,
  //         };
  //       } else return { username, password, age, id: req.params.userId };
  //     }
  //     // return { username, password, age, id: req.params.id };
  //     else {
  //       return user;
  //     }
  //   });
  //   console.log(updateUsers);
  //   await fs.promises.writeFile("./user.json", JSON.stringify(updateUsers), {
  //     encoding: "utf-8",
  //   });
  //   res.status(200).send({ message: "user updated" });
  // } catch (error) {
  //   next({ status: 500, internalMessage: error.message });
  // }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    
    var oid = new ObjectId(id);
   await student.deleteMany({_id:oid})
    // const users = await fs.promises
    //   .readFile("./user.json", { encoding: "utf8" })
    //   .then((data) => JSON.parse(data));
    // const filterUsers = users.filter((x) => {
    //   x.id !== id;
    //   return x;
    // });
    res.status(200).send("delete student");
  } catch (error) {
    next({ status: 404, internalMessage: error.message });
  }
});

module.exports = router;
