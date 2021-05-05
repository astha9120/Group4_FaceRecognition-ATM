const express=require('express');
const app=express();
const path=require("path");
const clientRoute=require("./routers/clientRoute");
const fs= require('fs');
const multer = require('multer');
const client=require("./models/client");
const imgModel = require('./models/image');
const { compile } = require('ejs');

app.use(express.json());


//creating a view
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.set("view engine","ejs");

//route for the client requests
app.use("/", clientRoute);
module.exports = app;