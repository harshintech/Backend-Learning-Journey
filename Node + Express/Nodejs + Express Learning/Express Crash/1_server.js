// const express = require("express");
import express from "express";


const app = express();

app.get("/",(req,res)=>{
    // res.send("<h1>Hello World I Am From Server.js File</h1>")

    //both are same
    // res.send({message:"nothing just try json data"})
    // res.json({message:"hello just try"})
})

app.get("/about",(req,res)=>{
    res.send("<h1>About is Here Don't worry")
})

app.listen(5000,()=>{
    console.log("server is running on port 5000")
})
