const express = require('express');
const app = express();
const userModel = require('./usermodel');

app.get("/" ,function(req,res){
    res.send("hello world");
})

app.get("/create" ,async function(req,res){
    let createdUser = await userModel.create({
        name : "John",
        email : "john@gmail.com",
        username : "john123"
    })
    res.send(createdUser);
})

app.get("/update" ,async function(req,res){
    let updatedUser = await userModel.findOneAndUpdate({username : "john123"},{name : "jonny"},{new : true})
    res.send(updatedUser);
})

app.get("/read" ,async function(req,res){
    let users = await userModel.find();
    res.send(users);
})

app.get("/delete" ,async function(req,res){
    let users = await userModel.findOneAndDelete({name : "John"});
    res.send(users);
})

app.listen(3000);