const express = require('express');
const app = express();
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');
const path = require('path');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/profile",isLoggedIn,async(req,res)=>{
    let user = await userModel.findOne({email:req.user.email});
    res.render("profile",{user});
})

app.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    let user = await userModel.findOne({email});
    if(!user){
        return res.status(404).send("Something is wrong");
    }
    bcrypt.compare(password,user.password,(err,result)=>{
        if(!result) return res.redirect("/login");
        let token = jwt.sign({email : email, userid : user._id}, "shhhh");
        res.cookie("token",token);
        res.status(200).redirect("/profile");
    })
})

app.post("/register",async(req,res)=>{
    let {email,password,name,username,age} = req.body;
    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User Already Exist");
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
            let user = await userModel.create({
                name,
                username,
                email,
                password:hash,
                age
            })
            let token = jwt.sign({email : email, userid : user._id}, "shhhh");
            res.cookie("token",token);
            res.send("Account Created");
        })
    })
})

app.get("/logout",(req,res)=>{
    res.cookie("token","");
    res.redirect("/login");
})

function isLoggedIn(req,res,next){
    if(req.cookies.token == "") res.redirect("/login");
    else {
        let data = jwt.verify(req.cookies.token,"shhhh");
        req.user = data;
    }
    next();
}

app.listen(3000);