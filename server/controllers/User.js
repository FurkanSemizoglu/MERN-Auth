const User = require("../models/userModel.js");
const isEmail = require("../utils/Regex.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, "email");
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }

  if (!isEmail(email)) {
    return res.status(400).json({ message: "Not exist email type" });
  }
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hash,
    });

    const maxAge = 3 * 60 * 60;
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Fixed 'username'
      jwtSecret,
      {
        expiresIn: maxAge, // 3hrs in sec
      }
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000, // 3hrs in ms
    });
  } catch (error) {
    res.status(400).json({
      message: "User not successful created",
      error: error.message,
    });
  }
  /* res.status(201).json({
    message: "User successfully created",
    user: user._id,
  });
  
  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      username,
      password: hash,
    })
      .then((user) => {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          { id: user._id, username, role: user.role },
          jwtSecret,
          {
            expiresIn: maxAge, // 3hrs in sec
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.status(201).json({
          message: "User successfully created",
          user: user._id,
        });
      })
      .catch((error) =>
        res.status(400).json({
          message: "User not successful created",
          error: error.message,
        })
      );
  }); */

  /*  try {
        await User.create({
          email,
          password,
        }).then(user =>
          res.status(200).json({
            message: "User successfully created",
            user,
          })
        )
      } catch (err) {
        res.status(401).json({
          message: "User not successful created",
          error: err.mesage,
        })
    } */
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("login");
  if (!email || !password) {
    return res.status(400).json({
      message: "Email or Password not present",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, email },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          res.status(201).json({
            message: "User successfully Logged in",
            user: user._id,
          });
        } else {
          res.status(400).json({ message: "Login not succesful" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

module.exports = { register, login };
