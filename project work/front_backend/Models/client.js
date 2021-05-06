const mongoose=require('mongoose');
const clientSchema = new mongoose.Schema({
    id:{
      type:Number,
      required:[true,"employee must have it's id"]
    },
    name:{
        type:String,
        required:[true,'A customer must have name']
    },
    Dob:{
        type:Date,
        required:[true,'A customer must have a date of birth']
    },
      Phone_number: {
        type: String,
        required:[true,'A customer must have a phone number']
      },
      Address: {
        type: String,
        required:[true,'A customer must have an address']
      },
      Email_id: {
        type: String,
        required:[true,'A customer must have an email id']
      },
        Branch_of_Bank: {
        type: String,
        required:[true,'A customer must have an account in a bank branch']
      },
      Pan_id: {
        type: String,
        required:[true,'A customer must have a Pan-id']
      },
    Primary_account_number:{
      type:String,
      required:[true,'A customer must have primary account number']
    },
    Saving_account_number:{
      type:String,
      required:[true,'A customer must have secondary account number']
    },  
    Primary_balance:{
      type:Number,
      default:0
    },
    Saving_balance:{
      type:Number,
      default:0
    },
    Reason:{
      type:String,
      //required:[true,'A customer has to give reason for appointment']
    },
    Schedule_time:{
      type:Date,
      //required:[true,'A customer has to select time']
    }
});
const Client= new mongoose.model("Client", clientSchema);
//console.log(Client); 
module.exports=Client;    
