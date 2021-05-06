const url="mongodb+srv://grp4:seatm@cluster0.jvxno.mongodb.net/details?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const transferMoney = require('./sen');

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


const A = require("./sen");
test("Transfer Money Insufficient Balance in Primary Account", () => {
    expect(A(9000,9090124512859918, "PRIMARY ACCOUNT")).toBe('Sorry!! Insufficient Balance in your primary account');
});

test("Transfer Money Sufficient Balance in Primary Account", () => {
    expect(A(400,9090124512859918, "PRIMARY ACCOUNT")).toBe('Transfer Successful from primary account');
});

test("Transfer Money Insufficient Balance in Savings Account", () => {
    expect(A(10000,9090124512859918, "SAVING ACCOUNT")).toBe('Sorry!! Insufficient Balance in your savings account');
});


test("Transfer Money Sufficient Balance in Savings Account", () => {
    expect(A(9000,9090124512859918, "SAVING ACCOUNT")).toBe('Transfer Successful from savings account');
});

test("Transfer Money Invalid Account Number", () => {
    expect(A(9000,9080124512859918, "PRIMARY ACCOUNT")).toBe('Sorry!! Invalid Account Number');
});
