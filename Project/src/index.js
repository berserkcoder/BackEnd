// require('dotenv').config({path: './env'})
import dotenv from 'dotenv';
import mongoose from "mongoose";
import express from "express";
import connectDB from './db/index.js';

dotenv.config({
    path: './env'
})

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error: ",error);
        throw error;            
    });

    app.listen(process.env.PORT || 8000, ()=>{
        console.log(` Server is running at port: ${process.env.PORT || 8000}`);
    });
})
.catch((err)=>{
    console.log("MONGODB connection failed !!!",err);
})