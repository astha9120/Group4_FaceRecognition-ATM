const express=require("express");
const clientController = require("../controller/clientController");

const router = express.Router();

router
  .route('/balance')
  .get(clientController.getBalance);

 router
 .route('/profile')
 .get(clientController.getProfile)
 .post(clientController.updateProfile);

 router
 .route('/addmoney')
 .get(clientController.addMoney)
 .post(clientController.addMoneyPost);

  module.exports = router;

