const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')



const app = express();

app.use(cors);

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())


app.listen(5000, () => {
    console.log('server is running')
})