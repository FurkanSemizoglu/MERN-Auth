const express = require('express');
const { register, login } = require('../controllers/User');


const router = express.Router();

console.log("is work")
router.post("/login" , login)

/* router.route("/register").post(register) */
router.post("/register" , register)


module.exports = router ;