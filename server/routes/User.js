const express = require('express');
const { register, login } = require('../controllers/User');


const router = express.Router();


router.get("/login" , login)

router.route("/register").post(register)


module.exports = router ;