const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv').config()


const app = express();

app.use(cors);

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000

app.listen(PORT, async() => {
    try {
        await dbConnect();
        console.log("Connected to DB and server is runnning");
    } catch (error) {
        console.log("error : ", error);
    }
  
})