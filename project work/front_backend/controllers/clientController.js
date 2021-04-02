const Client = require("../models/client");
const Atmcash=require("../models/atmcash");


exports.addMoney=async(req,res)=>{
    try{
        res.status(200);
        res.render("add_money");
    }catch(error){
        res.status(404).json({
            status:"Fail",
            message: erro
        })
    }
}

exports.addMoneyPost=async(req,res)=>{
    const credit=Number(req.body.number);
    try{
        res.status(200);
        Client.findOne({"id":1})
        .then((result)=>
        {
            if(req.body.submit=="ADD TO PRIMARY ACCOUNT")
            {
                const curr_balance=Number(result.Primary_balance);
                var updated_balance=curr_balance+credit;
                result.Primary_balance=updated_balance;
                result.save();
                //console.log(result);
            }
            else
            {
                const curr_balance=Number(result.Saving_balance);
                var updated_balance=curr_balance+credit;
                result.Saving_balance=updated_balance;
                result.save();
            }
            Atmcash.findOne({"id":1})
            .then((TotalATMCash)=>
            {
                var curr_cash=Number(TotalATMCash.cash);
                //console.log(curr_cash);
                curr_cash=curr_cash+credit;
                //console.log(curr_cash);
                TotalATMCash.cash=curr_cash;
                TotalATMCash.save();
            })
            .catch((err)=>{
                res.status(404).send();
                console.log(err);
            })
            console.log("Balance updated successfully");
            res.redirect("/clients/balance");
        })
        .catch((err)=>
        {
            res.status(404).send();
            console.log(err);
        })
    }
    catch(err)
    {
        console.log(err);
        res.status(404).send();
    }
}

exports.withdrawMoney=async(req,res)=>{
    try{
        res.status(200);
        res.render("Withdraw_money");
    }catch(error){
        res.status(404).json({
            status:"Fail",
            message: erro
        })
    }
}

exports.withdrawMoneyPost=async(req,res)=>{
    const debit=Number(req.body.number);
    try{
        res.status(200);
        Client.findOne({"id":1})
        .then((result)=>
        {
            if(req.body.submit=="ADD TO PRIMARY ACCOUNT")
            {
                const curr_balance=Number(result.Primary_balance);
                if(debit>curr_balance)
                {
                    res.status(404).send();
                    console.log("Insufficient Balance");
                }
                else
                {
                    Atmcash.findOne({"id":1})
                    .then((TotalATMCash)=>
                    {
                        var curr_cash=Number(TotalATMCash.cash);
                        if(curr_cash<debit)
                        {
                            res.status(404).send();
                            console.log("Insufficient Cash in the ATM");
                        }
                        else
                        {
                            var updated_balance=curr_balance-debit;
                            result.Primary_balance=updated_balance;
                            result.save();
                            curr_cash=curr_cash-debit;
                            TotalATMCash.cash=curr_cash;
                            TotalATMCash.save();
                        }
                    })
                    .catch((err)=>{
                        res.status(404).send();
                        console.log(err);
                    })
                    console.log("Debited Successfully");
                }
                //console.log(result);
            }
            else
            {
                const curr_balance=Number(result.Saving_balance);
                if(debit>curr_balance)
                {
                    res.status(404).send();
                    console.log("Insufficient Balance");
                }
                else
                {
                    Atmcash.findOne({"id":1})
                    .then((TotalATMCash)=>
                    {
                        var curr_cash=Number(TotalATMCash.cash);
                        if(curr_cash<debit)
                        {
                            res.status(404).send();
                            console.log("Insufficient Cash in the ATM");
                        }
                        else
                        {
                            var updated_balance=curr_balance-debit;
                            result.Saving_balance=updated_balance;
                            result.save();
                            curr_cash=curr_cash-debit;
                            TotalATMCash.cash=curr_cash;
                            TotalATMCash.save();
                        }
                    })
                    .catch((err)=>{
                        res.status(404).send();
                        console.log(err);
                    })
                    console.log("Debited Successfully");
                }
            }
            res.redirect("/clients/profile");
        })
        .catch((err)=>
        {
            res.status(404).send();
            console.log(err);
        })
    }
    catch(err)
    {
        console.log(err);
        res.status(404).send();
    }
}