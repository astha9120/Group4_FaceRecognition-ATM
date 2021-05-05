const Client = require("../models/client");
const Atmcash=require("../models/atmcash");
const Transaction=require("../models/transaction");
const path=require("path");
const fetch = require('node-fetch');
const alert = require('alert')

const fs=require('fs');

var main_id ; 

function ISTtime()
{
    var currentTime = new Date();

    var currentOffset = currentTime.getTimezoneOffset();

    var ISTOffset = 330;   // IST offset UTC +5:30 

    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    return ISTTime;
}


//get the profile
exports.getProfile=async(req,res)=>{
    try {
        //let s_id = number(sessionStorage.getItem('login_id'));
        const profile = await Client.find({id:main_id},{id:0,_id:0});
        console.log(profile);
        res.status(200);
        res.render('profile',{profile:profile[0]});
        
    } catch (error) {
        res.status(404);
        res.render("error", { message: "Sorry!! An Error Occurred" });
        return;
    }
}

//updation of profile
exports.updateProfile = async(req,res)=>{
    //let s_id = number(sessionStorage.getItem('login_id'));
    const Email_id = String(req.body.email);
    const Address=String(req.body.address);
    const Phone_number =String(req.body.phone);
    console.log("emails::::"+Email_id);
    try {
       res.status(200);
       Client.findOne({"id":main_id})
       .then((result)=>{
    
            result.Email_id=Email_id;
            result.Address=Address;
            result.Phone_number=Phone_number;
            result.save();
            console.log(result);
            res.redirect("/clients/profile");
       }) 
       .catch((err)=>
         {
            res.status(404);
            res.render("error", { message: "Sorry!! An Error Occurred" });
            return;
         })
        
    } catch (err) {
        res.status(404);
        res.render("error", { message: "Sorry!! An Error Occurred" });
        return;
    }
}


//chequebook renewal page
exports.chequebook= async(req,res)=>{
    try {
        //let s_id = number(sessionStorage.getItem('login_id'));
        res.status(200);
        const address = await Client.find({id:main_id},{Address:1,_id:0});
        console.log(address[0]);
            res.render("checkbook_home",{address:address[0].Address});
    } catch (error) {
        res.status(404);
        res.render("error", { message: "Sorry!! An Error Occurred" });
        return;
    }
}

//address page for chequebook renewal
exports.chequebook_confirm= async(req,res)=>{
    console.log(req.body.submit)
    try {
        if(req.body.submit=="Yes"){
            //let s_id = number(sessionStorage.getItem('login_id'));
            const address = await Client.find({id:main_id},{Address:1,_id:0});
            console.log(address[0]);
            res.render("checkbook_confirm",{address:address[0].Address});
        }
        else
            res.redirect("/clients/home");

    } catch (error) {
        res.status(404);
        res.render("error", { message: "Sorry!! An Error Occurred" });
        return;
    }
}

//contact us page
exports.contact=async(req,res)=>{
    try {
        res.status(200);
        res.render("contact");
    } catch (error) {
        res.status(404);
        res.render("error", { message: "Sorry!! An Error Occurred" });
        return;
    }
}

//Home page and balance
exports.home=async(req,res)=>{
    try {
        //let s_id = number(sessionStorage.getItem('login_id'));
        const balance = await Client.find({id:main_id},{_id:0,Primary_balance:1,Saving_balance:1});
        console.log(balance[0]);
        res.status(200);
        res.render('home',{balance:balance[0]});
    } catch (error) {
        res.status(404);
        res.render("error", { message: "Sorry!! An Error Occurred" });
        return;
    }
}

//Main page of the website
exports.landingPage=async(req,res)=>{
    try {
        res.status(200);
        res.render('landing')
    } catch (error) {
        res.status(404);
        res.render("error", { message: "Sorry!! An Error Occurred" });
        return;
    }
}


//Login page
exports.login=async(req,res)=>{
    try {
        res.status(200);
        res.render('login')
    } catch (error) {
        res.status(404);
        res.render("error", { message: "Sorry!! An Error Occurred" });
        return;
    }
}
  
//data retirval after login
exports.postLogin = async(req,res)=>{
    var obj = {
        id:req.body.number,
        face: {
            data: fs.readFileSync(path.join(path.resolve("./") +'\\Images' + '\\face.jpg')),
            contentType: 'image/png'
        },
        finger: {
            data: fs.readFileSync(path.join(path.resolve("./") +'\\Images' + '\\finger.jpg')),
            contentType: 'image/png'
        }
    }
   // console.log(path.join(path.resolve("./") +'\\uploads' + '\\finger'));
   //console.log(obj)
    try {
        main_id=Number(obj.id);
        console.log("MAIN_ID",main_id);
        const photos =await Client.find({id:main_id},{_id:0,img:1,Finger_img:1});
        // console.log("FACE",photos[0].img);
        // console.log("Finger",photos[0].Finger_img);

        var data = Buffer.from(photos[0].img.data.buffer, 'base64');
        fs.writeFile(path.resolve("./") +'\\Images' + '\\face_check.jpg', data, function(err) {
            if (err) {
              console.error(err)
              return
            }
        });

        data = Buffer.from(photos[0].Finger_img.data.buffer, 'base64');
        fs.writeFile(path.resolve("./") +'\\Images' + '\\finger_check.jpg', data, function(err) {
            if (err) {
                  console.error(err)
                  return
            }
        });
        res.status(200);
        
        var face_check = true;
        var finger_check = true;

        (async () => {
            try {
                var response = await fetch('http://127.0.0.1:3001/eval');
                var json = await response.json()
                face_check = json.response;

                response = await fetch('http://127.0.0.1:3002/eval');
                json = await response.json()
                finger_check = json.response;

                if (face_check&&finger_check) {res.redirect('/clients/home');}
                else {
                    alert('Invalid Login Images');
                    res.redirect('/clients/login');
                }
            } catch (error) {
                console.log(error);
            }
        })();      
         
     } catch (error) {
        res.status(404);
        alert("invalid UserID");
        res.redirect('/clients/login')
    }
}
    
//sessionStorage.removeItem('key');

exports.addMoney = async (req, res) => {
    try {
        res.status(200);
        res.render("Add_money");
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error
        })
    }
}


exports.addMoneyPost = async (req, res) => {
    const credit = Number(req.body.number);
    try {
        res.status(200);
        var result = await Client.findOne({ "id": main_id });
        if (result == null) {
            res.status(404);
            res.render("error", { message: "Sorry!! An Error Occurred" });
            return;
        }
        else {
            var account_number;
            if (req.body.transfer == "PRIMARY ACCOUNT") {
                var curr_balance = Number(result.Primary_balance);
                var updated_balance = curr_balance + credit;
                result.Primary_balance = updated_balance;
                account_number = result.Primary_account_number;
                result.save();
            }
            else {
                var curr_balance = Number(result.Saving_balance);
                var updated_balance = curr_balance + credit;
                result.Saving_balance = updated_balance;
                account_number = result.Saving_account_number;
                result.save();
            }
            var d = new Date();
            const newTransaction = new Transaction({
                message: 'Hello',
                Account_number: account_number,
                initial_balance: curr_balance,
                type_of_transaction: "ADD MONEY",
                transaction_amount: credit,
                final_balance: updated_balance,
                transfer_name: result.name,
                transfer_account_number: 'NULL',
                time: d
            });
            newTransaction.save();
            var TotalATMCash = await Atmcash.findOne({ "id": 1 });
            if (TotalATMCash == null) {
                res.status(404);
                res.render("error", { message: "Sorry!! An Error Occurred" });
                return;
            }
            else {
                var curr_cash = Number(TotalATMCash.cash);
                curr_cash = curr_cash + credit;
                TotalATMCash.cash = curr_cash;
                TotalATMCash.save();
            }
            console.log("Balance updated successfully");
            res.status(200);
            res.redirect("/clients/home");
        }
    }
    catch (err) {
        res.status(404);
        res.render("error", { message: "Sorry!! An Error Occurred" });
        return;
    }
}

exports.withdrawMoney = async (req, res) => {
    try {
        res.status(200);
        var curr_balance = await Client.findOne({ id: main_id }, { Primary_balance: 1, Saving_balance: 1 });
        var curr_cash = await Atmcash.findOne({ id: 1 }, { cash: 1 });
        res.render("Withdraw_money", { pbalance: Number(curr_balance.Primary_balance), sbalance: Number(curr_balance.Saving_balance), cash: Number(curr_cash.cash) });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error
        })
    }
}


exports.withdrawMoneyPost = async (req, res) => {
    const debit = Number(req.body.number);
    try {
        var result = await Client.findOne({ "id": main_id });
        if (result == null) {
            res.status(404);
            res.render("error", { message: "Sorry!! An Error Occurred" });
            return;
        }
        else {
            if (req.body.transfer == "PRIMARY ACCOUNT") {
                var curr_balance = Number(result.Primary_balance);
                if (debit > curr_balance) {
                    res.status(404);
                    res.render("error", { message: "Sorry!! Insufficient Balance in your account" });
                    return;
                }
                else {
                    var TotalATMCash = await Atmcash.findOne({ "id": 1 });
                    var curr_cash = Number(TotalATMCash.cash);
                    if (debit > curr_cash) {
                        res.status(404);
                        res.render("error", { message: "Sorry!! ATM has not sufficient cash" });
                        return;
                    }
                    else {
                        var updated_balance = curr_balance - debit;
                        result.Primary_balance = updated_balance;
                        result.save();
                        curr_cash = curr_cash - debit;
                        TotalATMCash.cash = curr_cash;
                        TotalATMCash.save();
                        var account_number = result.Primary_account_number;
                        var d = new Date();
                        const newTransaction = new Transaction({
                            message: 'Hello',
                            Account_number: account_number,
                            initial_balance: curr_balance,
                            type_of_transaction: "WITHDRAW MONEY",
                            transaction_amount: debit,
                            final_balance: updated_balance,
                            transfer_name: result.name,
                            transfer_account_number: 'NULL',
                            time: d
                        });
                        newTransaction.save();
                    }
                }
            }
            else {
                var curr_balance = Number(result.Saving_balance);
                if (debit > curr_balance) {
                    res.status(404);
                    res.render("error", { message: "Sorry!! Insufficient Balance in your account" });
                    return;
                }
                else {
                    var TotalATMCash = await Atmcash.findOne({ "id": 1 });
                    var curr_cash = Number(TotalATMCash.cash);
                    if (debit > curr_cash) {
                        res.status(404);
                        res.render("error", { message: "Sorry!! ATM has not sufficient cash" });
                        return;
                    }
                    else {
                        var updated_balance = curr_balance - debit;
                        result.Saving_balance = updated_balance;
                        result.save();
                        curr_cash = curr_cash - debit;
                        TotalATMCash.cash = curr_cash;
                        TotalATMCash.save();
                        account_number = result.Saving_account_number;
                        var d = new Date();
                        const newTransaction = new Transaction({
                            message: 'Hello',
                            Account_number: account_number,
                            initial_balance: curr_balance,
                            type_of_transaction: "WITHDRAW MONEY",
                            transaction_amount: debit,
                            final_balance: updated_balance,
                            transfer_name: result.name,
                            transfer_account_number: 'NULL',
                            time: d
                        });
                        newTransaction.save();
                    }
                }
            }
            console.log("Transaction Successful");
            res.status(200);
            res.redirect("/clients/home");
        }
    }
    catch {
        res.status(404);
        res.render("error", { message: "Sorry!! An Error Occurred" });
        return;
    }
}


exports.transferMoney = async (req, res) => {
    try {
        res.status(200);
        res.render("Transfer_money");
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: erro
        })
    }
}

exports.transferMoneyPost = async (req, res) => {
    const transfer = Number(req.body.number);
    try {
        var result = await Client.findOne({ "id": main_id });
        if (req.body.transfer == "PRIMARY ACCOUNT") {
            const curr_balance = Number(result.Primary_balance);
            //console.log(curr_balance);
            if (transfer > curr_balance) {
                res.status(404);
                res.render("error", { message: "Sorry!! Insufficient Balance in your account" });
                return;
            }
            else {
                var transfer_acnumber = "";
                var tmp = req.body.acnumber;
                for (var i = 0; i < 16; i++) {
                    if (i % 4 == 0 && i) {
                        transfer_acnumber += " ";
                    }
                    transfer_acnumber += tmp[i];
                }
                var transferAccount = await Client.findOne({ $or: [{ "Primary_account_number": transfer_acnumber }, { "Saving_account_number": transfer_acnumber }] });
                if (transferAccount == null) {
                    res.status(404);
                    res.render("error", { message: "Sorry!! Invalid Account Number" });
                    return;
                }
                else {
                    var updated_balance = curr_balance - transfer;
                    result.Primary_balance = updated_balance;
                    result.save();
                    var account_number = result.Primary_account_number;
                    if (transferAccount.Primary_account_number == transfer_acnumber) {
                        var curr_balance2 = Number(transferAccount.Primary_balance);
                        var updated_balance2 = curr_balance2 + transfer;
                        transferAccount.Primary_balance = updated_balance2;
                        transferAccount.save();
                    }
                    else {
                        var curr_balance2 = Number(transferAccount.Saving_balance);
                        var updated_balance2 = curr_balance2 + transfer;
                        transferAccount.Saving_balance = updated_balance2;
                        transferAccount.save();
                    }
                    var d = new Date();
                    const newTransaction = new Transaction({
                        message: 'Hello',
                        Account_number: account_number,
                        initial_balance: curr_balance,
                        type_of_transaction: "TRANSFER MONEY TO",
                        transaction_amount: transfer,
                        final_balance: updated_balance,
                        transfer_name: transferAccount.name,
                        transfer_account_number: transfer_acnumber,
                        time: d
                    });
                    newTransaction.save();
                    const newTransaction2 = new Transaction({
                        message: 'Hello',
                        Account_number: transfer_acnumber,
                        initial_balance: curr_balance2,
                        type_of_transaction: "TRANSFER MONEY FROM",
                        transaction_amount: transfer,
                        final_balance: updated_balance2,
                        transfer_name: result.name,
                        transfer_account_number: account_number,
                        time: d
                    });
                    newTransaction2.save();
                    console.log("Money Transfered Successfully");
                    res.status(200);
                    res.render("Transfer_successful", { transfer_amount: transfer, transfer_fromname: result.name, transfer_fromaccount_number: account_number, transfer_toname: transferAccount.name, transfer_toaccount_number: transfer_acnumber });
                }
            }
        }
        else {
            const curr_balance = Number(result.Saving_balance);
            if (transfer > curr_balance) {
                res.status(404);
                res.render("error", { message: "Sorry!! Insufficient Balance in your account" });
                return;
            }
            else {
                var transfer_acnumber = "";
                var tmp = req.body.acnumber;
                for (var i = 0; i < 16; i++) {
                    if (i % 4 == 0 && i) {
                        transfer_acnumber += " ";
                    }
                    transfer_acnumber += tmp[i];
                }
                var transferAccount = await Client.findOne({ $or: [{ "Primary_account_number": transfer_acnumber }, { "Saving_account_number": transfer_acnumber }] });
                if (transferAccount == null) {
                    res.status(404);
                    res.render("error", { message: "Sorry!! Invalid Account Number" });
                    return;
                }
                else {
                    var updated_balance = curr_balance - transfer;
                    result.Saving_balance = updated_balance;
                    result.save();
                    var account_number = result.Saving_account_number;
                    if (transferAccount.Primary_account_number == transfer_acnumber) {
                        var curr_balance2 = Number(transferAccount.Primary_balance);
                        var updated_balance2 = curr_balance2 + transfer;
                        transferAccount.Primary_balance = updated_balance2;
                        transferAccount.save();
                    }
                    else {
                        var curr_balance2 = Number(transferAccount.Saving_balance);
                        var updated_balance2 = curr_balance2 + transfer;
                        transferAccount.Saving_balance = updated_balance2;
                        transferAccount.save();
                    }
                    var d = new Date();
                    const newTransaction = new Transaction({
                        message: 'Hello',
                        Account_number: account_number,
                        initial_balance: curr_balance,
                        type_of_transaction: "TRANSFER MONEY TO",
                        transaction_amount: transfer,
                        final_balance: updated_balance,
                        transfer_name: transferAccount.name,
                        transfer_account_number: transfer_acnumber,
                        time: d
                    });
                    newTransaction.save();
                    const newTransaction2 = new Transaction({
                        message: 'Hello',
                        Account_number: transfer_acnumber,
                        initial_balance: curr_balance2,
                        type_of_transaction: "TRANSFER MONEY FROM",
                        transaction_amount: transfer,
                        final_balance: updated_balance2,
                        transfer_name: result.name,
                        transfer_account_number: account_number,
                        time: d
                    });
                    newTransaction2.save();
                    console.log("Money Transfered Successfully");
                    res.status(200);
                    res.render("Transfer_successful", { transfer_amount: transfer, transfer_fromname: result.name, transfer_fromaccount_number: account_number, transfer_toname: transferAccount.name, transfer_toaccount_number: transfer_acnumber });
                }
            }
        }
    }
    catch {
        res.status(404);
        res.render("error", { message: "Sorry!! An Error Occurred" });
        return;
    }
}