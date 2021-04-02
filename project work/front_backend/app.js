const express=require('express');
const mongoose=require('mongoose');
const app=express();
const path=require("path");
const clientRoute=require("./routers/clientRoute");

const client=require("./models/client");

app.use(express.json());


//creating a view
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");

//route for the client requests
app.use("/clients", clientRoute);
module.exports = app;
