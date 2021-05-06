const express=require("express");
const clientController = require("../controller/clientController");

const router = express.Router();


//route for the balance query
router.route('/balance').get(clientController.getBalance);

//route for profile
router
 .route('/profile')
 .get(clientController.getProfile)
 .post(clientController.updateProfile);

//rout for add money
 router
 .route('/addmoney')
 .get(clientController.addMoney)
 .post(clientController.addMoneyPost);

 //rout for withdraw money
 router
 .route('/withdrawmoney')
 .get(clientController.withdrawMoney)
 .post(clientController.withdrawMoneyPost);

//route for chequebook renewal
router
.route('/chequebook')
.get(clientController.chequebook);


//route for chequebook renewal confirmation
router
.route('/chequebook_confirm')
.post(clientController.chequebook_confirm);

module.exports=router;