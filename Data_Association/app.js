const express = require('express');
const app = express();
const userModel = require('./models/user')
const postModel = require('./models/post')


app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.get('/create',async(req,res)=>{
    let user = await userModel.create({
        username : "shreya",
        email : "shreya@gmail.com",
        age : 34
    })
    res.send(user);
})

app.get('/post/create',async(req,res)=>{
    let post = await postModel.create({
        postdata : "Hello kese ho sab",
        user : "688f4c6276d34fee7467b331"
    })

    let user = await userModel.findOne({_id : "688f4c6276d34fee7467b331"});
    user.posts.push(post._id);
    await user.save();
    res.send({post,user});
})


app.listen(3000);