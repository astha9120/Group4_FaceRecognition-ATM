const url="mongodb+srv://grp4:seatm@cluster0.jvxno.mongodb.net/details?retryWrites=true&w=majority";
const mongoose = require('mongoose')
const Client = require('./client')

const connectionParams={
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}

mongoose.connect(url,connectionParams).then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log("connection failed");
})

const curr_balance = 5000;
const curr_saving_balance = 9500;
function A(amount, account, account_type){
        const transfer = Number(amount);
        if (account != 9090124512859918) 
        {
            return 'Sorry!! Invalid Account Number';
        }
        

        if (account_type == "PRIMARY ACCOUNT")
        {
            if (transfer > curr_balance) 
            {
                return 'Sorry!! Insufficient Balance in your primary account';
            }
            
            return 'Transfer Successful from primary account';
        }

        if (account_type == "SAVING ACCOUNT")
        {
            if (transfer > curr_saving_balance) 
            {
                return 'Sorry!! Insufficient Balance in your savings account';
            }

            return 'Transfer Successful from savings account';
        }
}

module.exports = A;