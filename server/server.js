const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv').config();
const AuthRoute = require('./routes/User.js');
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Specify options for bodyParser
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api", AuthRoute); // Mount AuthRoute under /api path

// Default route
app.use("/", (req, res) => {
    res.json({
        message: "API is working"
    });
});

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, async () => {
    try {
        await dbConnect(); // Connect to the database
        console.log("Connected to DB and server is running");
    } catch (error) {
        console.log("Error:", error);
    }
});
