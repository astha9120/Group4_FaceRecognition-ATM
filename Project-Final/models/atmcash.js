const mongoose=require('mongoose');
const atmcashSchema= new mongoose.Schema({
    id:
    {
        type:Number
    },
    cash:
    {
        type:Number
    }
});

const Atmcash= new mongoose.model("atmcashes",atmcashSchema);
//console.log(Atmcash);
module.exports=Atmcash;