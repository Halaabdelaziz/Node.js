const fs = require("fs");
const { validateUser } = require("../userHelpers");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
// const { json } = require("body-parser");

router.post("/", validateUser, async (req, res, next) => {
  try {
    const { username, age, password } = req.body;
    const data = await fs.promises
      .readFile("./user.json", { encoding: "utf8" })
      .then((data) => JSON.parse(data));
    const id = uuidv4();
    data.push({ id, username, age, password });
    await fs.promises.writeFile("./user.json", JSON.stringify(data), {
      encoding: "utf8",
    });
    res.send({ id, message: "sucess" });
  } catch (error) {
    next({ status: 500, internalMessage: error.message });
  }
});
router.post("/login", validateUser, (req, res,next) => {
   try{ const userexist = users.some((user) => (user.name = req.body.name));
    if (!userexist) {
      return  next({ status: 403, internalMessage: error.message });
    } 
    else {
      res.status(200).send("login validate");
    }}
    catch(error){
        next({ status: 403, internalMessage: error.message });
    }
});
  

router.get("/", async (req, res, next) => {
  try {
    const age = Number(req.query.age);
    const users = await fs.promises
      .readFile("./user.json", { encoding: "utf8" })
      .then((data) => JSON.parse(data));
      if(!age){
        res.send(users);
      }
    const filteredUsers = users.filter((user) => user.age === age);
    res.send(filteredUsers);
  } catch (error) {
    next({ status: 500, internalMessage: error.message });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const users = await fs.promises
      .readFile("./user.json", { encoding: "utf8" })
      .then((data) => JSON.parse(data));
    const filterUsers = users.filter((x) => x.id === id);
    console.log(filterUsers);
    res.status(200).send(filterUsers);
  } catch (error) {
    next({ status: 404, internalMessage: error.message });
  }
});

router.patch("/:userId", validateUser, async (req, res, next) => {
  try {
    const { username, password, age } = req.body;
    const myFile = await fs.promises
      .readFile("./user.json", { encoding: "utf-8" })
      .then((data) => JSON.parse(data));
    const updateUsers = myFile.map((user) => {
      if (user.id === req.params.userId) {
        
        if(req.body.username){
          return {username , age:user.age, password:user.password,id:req.params.userId }
        }
        else if(req.body.password){
          return {username:user.username, age:user.age, password,id:req.params.userId}
        }
        else if(req.body.age){
          return {username:user.username,age,password:user.password,id:req.params.userId}
        }
        else return { username, password, age, id: req.params.userId };
      }
      // return { username, password, age, id: req.params.id };
      else{
        return user;
      }
     
    });
    console.log(updateUsers);
    await fs.promises.writeFile("./user.json", JSON.stringify(updateUsers), {
      encoding: "utf-8",
    });
    res.status(200).send({ message: "user updated" });
  } catch (error) {
    next({ status: 500, internalMessage: error.message });
  }
});

router.delete("/:id", async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const users = await fs.promises
        .readFile("./user.json", { encoding: "utf8" })
        .then((data) => JSON.parse(data));
      const filterUsers = users.filter(x => {x.id !== id 
        return x });
      res.status(200).send(filterUsers);
    } catch (error) {
      next({ status: 404, internalMessage: error.message });
    }
  });

module.exports = router;
