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

const Atmcash= new mongoose.model("Atmcash",atmcashSchema);
//console.log(Atmcash);
module.exports=Atmcash;