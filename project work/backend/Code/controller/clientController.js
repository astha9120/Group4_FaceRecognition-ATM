const Client = require("../models/client");

exports.getBalance = async(req,res)=>{
    try {
        const balance = await Client.find({id:1},{Primary_balance:1,_id:0,Saving_balance:1});
        console.log(balance[0]);
        res.status(200);
        res.render('balance',{Primary_balance:balance[0].Primary_balance,Saving_balance:balance[0].Saving_balance})
    } catch (error) {
        res.status(404).json({
            status:'fail',
            message:error
        })
    }
}

exports.getProfile=async(req,res)=>{
    try {
        const profile = await Client.find({id:1},{id:0,_id:0});
       // console.log(profile);
        res.status(200);
        res.render('profile',{profile:profile[0]});
        
    } catch (error) {
        res.status(404).json({
            status:'fail',
            message:error
        })
    }
}


exports.updateProfile = async(req,res)=>{
    
   const Email_id = String(req.body.email);
    const Address=String(req.body.address);
    const Phone_number =String(req.body.phone_num);
    console.log("emails::::"+Email_id);
    try {
       res.status(200);
       Client.findOne({"id":1})
       .then((result)=>{
        if(req.body.submit == "submit"){
            result.Email_id=Email_id;
            result.Address=Address;
            result.Phone_number=Phone_number;
            result.save();
            console.log(result);
            res.redirect("/clients/profile");
            }
       }) 
       .catch((err)=>
         {
           res.status(404).send();
           console.log(err);
         })
        
    } catch (err) {
        res.status(404).json({
            status:'fail',
            message:error
        })
    }
}

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