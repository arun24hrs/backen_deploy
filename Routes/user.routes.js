const UserModel = require("../Model/userModel");
const mongoose = require("mongoose");
const {Router} = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const userRouter = Router();

userRouter.get("/", (req, res, next)=>{
    res.send("Users");
    next();

})


userRouter.post("/register", async(req, res, next)=>{
    const {email, name, pass, age} = (req.body);
    try {
        bcrypt.hash(pass, 5, async(err, hash)=>{
            const user = new UserModel({email, name, age, pass: hash})
            await user.save();
        });
    res.status(200).send({message: "New User Added."})
    } catch (error) {
        console.log(error);
        res.status(400).send({message: "Failed to register user."})
    }
})

userRouter.post("/login", async(req, res, next)=>{
    const {email, pass} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(pass, user.pass, (err, result)=> {
                if(result){
                    const token = jwt.sign({authorId: user._id, author: user.name}, "userPass");
                    if(token){
                        res.status(200).send({message: "Login Success", token})
                        }
                }else {
                    res.send({msg: "Wrong Credentials."})
                }
            });
        } else {
            res.status(200).send({message: "Wrong Credentials."})
        }
    } catch (error) {
        console.log(error);
        res.send(400).send({message: "Login Failed."})
    }
})




module.exports = userRouter;