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


var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,__dirname+'/uploads');
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname)
    },
})
var upload =multer({storage:storage})
var multipleUpload = upload.fields([{name:'face'},{name:'finger'}])

app.get('/',(req,res)=>{
      res.render('imagePages');
})
  
 app.post('/',multipleUpload,(req,res)=>{

    if(req.files){
        console.log('files uploaded');
        console.log(req.files)
    }
}) 


//route for the client requests
app.use("/clients", clientRoute);
module.exports = app;