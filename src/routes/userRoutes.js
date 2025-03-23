const express = require ('express');
const route = express.Router();
const {loginUser,registerUser} = require('../controllers/userControllers');

route.post('/register',registerUser);
route.post('/login',loginUser);

module.exports=route;
