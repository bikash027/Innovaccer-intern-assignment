const express=require('express');
const controllers=require('../controllers/controllers');

const router=express.Router();


router.get('/',controllers.home);
router.post('/',controllers.postVisitorDetails);
router.get('/host',controllers.hostForm);
router.post('/host',controllers.postHost);
router.get('/checkout',controllers.checkout);


module.exports=router;