// import express from 'express'
const express = require('express')
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,'/public')));
app.set('view engine', 'ejs');
// app.use(function(req,res,next){
//   console.log('middleware is working');
//   next();
// });

// app.use(function(req,res,next){
//   console.log('middleware is working again');
//   next();
// });

app.get('/', (req, res) => {
  fs.readdir(`./files`,function(err,files){
    res.render('index',{files:files});
  })
});

app.get("/file/:title",function(req,res){
  fs.readFile(`./files/${req.params.title}`, "utf-8" , function(err,filedata){
    res.render('show',{filename : req.params.title , filedata : filedata});
  })
})

app.get("/edit/:title",function(req,res){
  res.render('edit',{filename:req.params.title});
})
// app.get('/profile/:username', function(req,res,next){
//   res.send(req.params.username);
// });

app.post('/edit',function(req,res,next){
  fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
    res.redirect("/");
  })
})

app.post('/create',function(req,res,next){
  fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details , function(err){
    res.redirect("/");
  })
})

// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).send('Something broke!');
// });

app.listen(3000 , function(){
    console.log('server is running on port 3000');
})