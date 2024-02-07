const User = require("../models/userModel.js");
const isEmail = require("../utils/Regex.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, "email");
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password less than 6 characters" });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ message: "Not exist email type" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hash,
    });

    const maxAge = 3 * 60 * 60;
    const token = await jwt.sign(
      { id: newUser._id, email: newUser.email }, // Fixed 'username'
      jwtSecret,
      {
        expiresIn: maxAge, // 3hrs in sec
      }
    );

   
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000, // 3hrs in ms
    });
    return  res.status(201).json({
      status: "OK",
      newUser,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not successful created",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("login");
    if (!email || !password) {
      return res.status(400).json({
        message: "Email or Password not present",
      });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password less than 6 characters" });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ message: "Not exist email type" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      });
    }
    // comparing given password with hashed password
    bcrypt.compare(password, user.password).then(function (result) {
      if (result) {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign({ id: user._id, email }, jwtSecret, {
          expiresIn: maxAge, // 3hrs in sec
        });
         res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        }); 
      
        return  res.status(201).json({
          message: "User successfully Logged in",
          user: user._id,
        });
      } else {
        return res.status(400).json({ message: "Login not succesful" });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

module.exports = { register, login };
