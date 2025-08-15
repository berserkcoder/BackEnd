require('dotenv').config()
const express = require("express");
const app = express();
const port = 3000;

app.get("/",function(req,res){
    res.send("hello world");
})

app.get("/twitter",(req,res)=>{
    res.send("INFO APPLICATION");
})

app.get("/login",(req,res)=>{
    res.send('<h1> please login at ragging charms </h1>');
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
})