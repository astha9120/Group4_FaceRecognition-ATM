const express=require("express");
const clientController = require("../controller/clientController");

const router = express.Router();

const path=require("path");
const multer = require('multer');
const fs=require('fs');


//route for the balance query
router.
route('/home')
.get(clientController.home);

//route for profile
router
 .route('/profile')
 .get(clientController.getProfile)
 .post(clientController.updateProfile);

 //route to contact
 router
 .route('/contact')
 .get(clientController.contact)

//route for chequebook renewal
router
.route('/chequebook')
.get(clientController.chequebook);


//route for chequebook renewal confirmation
router
.route('/chequebook_confirm')
.post(clientController.chequebook_confirm);

//route for landing page
router.
route('/')
.get(clientController.landingPage);



var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'Images');
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname+".jpg")
    },
})
var upload =multer({storage:storage})
var multipleUpload = upload.fields([{name:'face'},{name:'finger'}])

//route login
  router
  .route('/login')
  .get(clientController.login)
  .post(multipleUpload,clientController.postLogin)

//rout for add money
//  router
//  .route('/addmoney')
//  .get(clientController.addMoney)
//  .post(clientController.addMoneyPost);

//  //rout for withdraw money
//  router
// .route('/withdrawmoney')
// .get(clientController.withdrawMoney)
// .post(clientController.withdrawMoneyPost);


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

router
.route('/transfermoney')
.get(clientController.transferMoney)
.post(clientController.transferMoneyPost);

// <<<<<<< Shubham
// =======
//  //rout for withdraw money
//  router
//  .route('/withdrawmoney')
//  .get(clientController.withdrawMoney)
//  .post(clientController.withdrawMoneyPost);

// //route for chequebook renewal
// router
// .route('/chequebook')
// .get(clientController.chequebook);


// //route for chequebook renewal confirmation
// router
// .route('/chequebook_confirm')
// .post(clientController.chequebook_confirm);

// >>>>>>> master
module.exports=router;