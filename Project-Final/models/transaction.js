const mongoose=require('mongoose');
const TransactionSchema =new mongoose.Schema({
    message:
    {
        type: String
    },
    Account_number:
    {
        type: String
    },
    initial_balance:
    {
        type: Number
    },
    type_of_transaction:
    {
        type: String
    },
    transaction_amount:
    {
        type: Number
    },
    final_balance:
    {
        type: Number
    },
    transfer_name:
    {
        type: String
    },
    transfer_account_number:
    {
        type: String
    },
    time:
    {
        type: Date
    }
}
);

const Transaction= new mongoose.model("Transaction", TransactionSchema);
//console.log(Transaction); 
module.exports=Transaction;